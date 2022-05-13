import {ApplicationRef, ElementRef, Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, Subject, tap} from 'rxjs';
import {merge} from 'lodash-es';
import {LookupDto, LookupType, OrderDto, OrderLineDto, OrderState, ProductDto} from 'library/shared/models';
import {Utilitiess} from 'library/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';


// add chrome to the Window context so typescript stops complaining
declare global {
    interface Window {
        chrome: any;
    }
}

@Injectable({providedIn: 'root'})
export class PosService implements Resolve<any> {
    elementRef: ElementRef;
    public webViewMessage = new Subject<any>();

    constructor(
        private ref: ApplicationRef,
        private _httpClient: HttpClient) {
        // Desktop App Message Listener
        // TODO : Split this service, not used in mobile, tablet
        window?.chrome?.webview?.addEventListener('message', (event) => {
            console.log(event.data);
            this.webViewMessage.next(event.data);
        });
        // Bu veri api dan şubeye göre seçilmeli. BranchState
        // Açık olan adisyonlar ve diğer Slon,Masa,Menu bilgileri ile birlikte.
        const demoData: OrderState = {

            selectedHall: undefined,
            showEmptyTables: true,
            posSettings: {
                useVKeboard: true,
                useHalls: true,
                useCategories: true,
                useCheckGroup: false,
                useGuest: true,
                serviceTypes: ['table', 'takeaway', 'carrier'],
                type: 'restaurant',
                postype: 'cashier',
                ordersOnTop: true,
            },
            showOptions: false,
            searchMode: false,
            screenMode: 'table',
            hideKeyboard: true,

            branch: undefined,
            halls: [],
            tables: [],
            productCategories: [],
            products: [],
            productCondiments: [],
            orders: [],
        };

        this._orderState.next(demoData);

    }

    private _keyboardInput: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    set keyboardInput(value: string) {
        this._keyboardInput.next(value);
    }

    private _orderState: BehaviorSubject<OrderState> = new BehaviorSubject<OrderState>(null);

    set orderState(value: any) {
        // Merge the new config over to the current config
        const config = merge({}, this._orderState.getValue(), value);

        // Execute the observable
        this._orderState.next(config);
    }

    get orderState$(): Observable<OrderState> {
        return this._orderState.asObservable();
    }

    get keyboardInput$(): Observable<string> {
        return this._keyboardInput.asObservable();
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return forkJoin([
            this.getHalls(),
            this.getTables(),
            this.getProductCategories(),
            this.getProducts()]);
    }

    getHalls(): Observable<any> {
        return this._httpClient.post<any>('api/v1/Lookup/search',
            {type: LookupType.Hall})
            .pipe(tap((response) => {
                this.orderState = {halls: response.data};
            }));
    }

    getTables(): Observable<any> {
        return this._httpClient.post<any>('api/v1/Lookup/search',
            {type: LookupType.Table})
            .pipe(tap((response) => {
                this.orderState = {tables: response.data};
            }));
    }

    getProductCategories(): Observable<any> {
        return this._httpClient.post<any>('api/v1/ProductCategories/search',
            {})
            .pipe(tap((response) => {
                this.orderState = {productCategories: response.data};
            }));
    }

    getProducts(): Observable<any> {
        return this._httpClient.post<any>('api/v1/Products/search',
            {})
            .pipe(tap((response) => {
                this.orderState = {products: response.data};
            }));
    }

    /*
    * Post message(JSON Object) to Desktop App
    * */
    public postMessageToDesktop(message: any): void {
        window?.chrome?.webview?.postMessage(message);
    }

    addToCurrentOrder(product: ProductDto): void {
        if (!this._orderState.getValue().selectedOrder) {
            const order = new OrderDto();
            order.id = Utilitiess.guid();
            this.orderState = {selectedOrder: order};
        }
        const orderLines = this._orderState.getValue().selectedOrder?.orderLines;

        const existingOne = orderLines.filter(l => l.id == product.id);
        if (existingOne && existingOne.length) {
            // existingOne[0].amount++;
            // existingOne[0].linePrice = this.round(existingOne[0].amount * existingOne[0].price);
            this.orderState = {
                currentOrder: {
                    orderLines: orderLines,
                    selectedOrderLine: existingOne[0]
                }
            };
        } else {
            const newOrderLine = new OrderLineDto() ;//= product as OrderLineDto;
            // newOrderLine.amount = 1;
            // console.log(this._orderState.getValue().keypadMode);
            // console.log(this._orderState.getValue().keypadBuffer);
            if (this._orderState.getValue().keypadMode == 'X' && this._orderState.getValue().keypadBuffer) {
                // newOrderLine.amount = Number(this._orderState.getValue().keypadBuffer);
                this.orderState = {keypadBuffer: ''};
            }
            // newOrderLine.discount = 0;
            // newOrderLine.linePrice = this.round(newOrderLine.amount * newOrderLine.price);
            orderLines.push(newOrderLine);
            this.orderState = {
                currentOrder: {
                    orderLines: orderLines,
                    selectedOrderLine: newOrderLine
                }
            };
        }
    }

    removeSelectedLines(): void {
        const order = this._orderState.getValue().selectedOrder;
        // order.orderLines = order.orderLines.filter(l => l.checked !== true);
        this.orderState = {
            selectedOrder: order
        };
    }

    getOrdersTable(order: OrderDto): LookupDto | null {
        if (order.tableId) {
            return this._orderState.getValue().tables.filter(t => t.id == order.tableId)[0];
        }
        return null;
    }

    setCurrentOrderByTable(table: LookupDto): void {
        const order = this._orderState.getValue().orders.filter(o => o.tableId == table.id)[0];
        // order.CheckAll(false);
        this.orderState = {
            selectedTable: table,
            selectedOrder: order
        };
    }

    // Send Order to Kitchen etc.
    postCurrentOrder(): void {
        const order = this._orderState.getValue().selectedOrder;
        // Detect not posted items... Kitchen Print !! <- Kitchen Printer Option
        order.orderLines.forEach((t) => {
            // t.posted = true;
        });
        // TODO: If not using table ?
        order.tableId = this._orderState.getValue().selectedTable.id;
        const orderList = this._orderState.getValue().orders;
        if (orderList.filter(o => o.id == order.id).length == 0) {
            orderList.push(order);
        }
        this.orderState = {
            orders: orderList,
            tabletOperationMode: 'NewCheck',
            selectedHall: null,
            selectedCategory: null,
            selectedTable: null,
            selectedOrder: null
        };

    }

    round(value: number, direction: string = 'up', digits: number = 2): any {
        const round = 'down' === direction ? Math.floor : Math.ceil;
        return round(value * (10 ** digits)) / (10 ** digits);
    }

    // TODO: Simplify... this way hard to understand ...
    setKeyboardTarget(elementRef: ElementRef): void {
        // console.log('setKeyboardTarget');
        if (this._orderState.getValue().posSettings.useVKeboard == true) {
            if (elementRef == null) {
                this.orderState = {hideKeyboard: true};
                this.elementRef = null;
            } else {
                this.orderState = {hideKeyboard: false};
                this.elementRef = elementRef;
                this._keyboardInput.next(this.elementRef.nativeElement.value);
            }
        }
    }

    keyboardOnChange(input): void {
        if (this.elementRef) {
            this.elementRef.nativeElement.value = input;
            this.elementRef.nativeElement.dispatchEvent(new KeyboardEvent('input'));
        }
    }

    keyboardOnKeyPres(input): void {

    }


}
