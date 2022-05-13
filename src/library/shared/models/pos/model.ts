import {CustomerDto, ProductCategoryDto, ProductDto } from '..';
import {BranchDto} from '../BranchDto';
import {LookupDto} from '../Lookup';



export class OrderLineDto {
    id: string;
    quantity: number;
    productId: string;
    product: ProductDto | null;
    price: number;
    orderId: string;
    order: OrderDto | null;
    tax: number;
    totalPrice: number;
    discountPercentage: number;
    discountAmount: number;
    productDetail: string | null;
    isPaid: boolean;
    kdv: number | null;
}





export class OrderDto {

    orderNo: number;
    genelToplamTutar: number;
    indirimOraniToplami: number;
    indirimMiktariToplami: number;

    orderCustomerId: string;
    orderCustomer: CustomerDto;
    toplamKDV: number;
    fromTable: string | null;
    cancelled: boolean;
    free: boolean;
    cancelReason: string | null;
    posted: boolean;


    id?: string;
    orderLines: OrderLineDto[] = [];
    tableId?: string;

    selectedOrderLine?: OrderLineDto;
    selectedOrderGroup?: OrderLineGroup;

    // CheckAll(check:boolean){
    // this.orderLines.forEach(l=>l.checked=check);
    // }

    get total(): number {
        const sum: number = 0;
        // this.orderLines.forEach(a => sum += a.price);
        return sum;
    }
}

/**
 * Currently Show Order At screen
 */
export class CurrentOrder extends OrderDto {


    /*
    * Ürün Id si ile gruplanmış sipariş satırları
    * */
    grouped?(): OrderLineGroup[] {
        const result: OrderLineGroup[] = [];

        this.orderLines.forEach((ol) => {
            const existing = result.filter(t => t.id == ol.id);
            if (existing.length == 0) {
                // result.push({
                //     id: ol.id,
                //     posted: ol.posted,
                //     name: ol.name,
                //     category: ol.category,
                //     condimentsExclude: [],
                //
                //     amount: 0,
                //     price: 0,
                //     discount: 0,
                //     linePrice: 0,
                //     details: []
                // });
            }
            const currentGroup = result.filter(t => t.id == ol.id)[0];

            // currentGroup.amount++;
            // currentGroup.linePrice += ol.linePrice;
            currentGroup.details.push(ol);
        });

        return result;
    }
}

export class OrderLineGroup extends OrderLineDto {
    details: OrderLineDto[];
}

export interface DialogData {
    orderLine: OrderLineDto;
    values: any;
    name: string;
}

// Restaurant POS Settings
export class PosSettings {
    type: string | 'restaurant' | 'market' = 'restaurant';
    postype: string | 'waiter' | 'cashier'; // only for restaturant... for market ... at screen may be filtered

    useVKeboard: boolean = true;
    useHalls: boolean = true;
    useCategories: boolean = true;
    useCheckGroup: boolean = true;
    useGuest: boolean = true;
    serviceTypes: ServiceType[];
    ordersOnTop: boolean = true;
}

/*
    public enum ServiceType
    {
        Table = 1,
        Package = 2,
        TakeAway = 3,
    }
*/
export type ServiceType = 'table' | 'takeaway' | 'carrier';
export type TabletOperation = 'NewCheck' | 'EmptyTable' | 'OrderedTable' | 'SelectProduct';


export class OrderState {

    /*
    * Pos Order Screen Settings
    * */
    showOptions?: boolean = false;
    posSettings: PosSettings;
    screenMode?: ServiceType;
    operationMode?: string;
    tabletOperationMode?: TabletOperation;

    searchMode: boolean;
    searchString?: string;

    hideKeyboard: boolean;
    keypadMode?: string;
    keypadBuffer?: string;

    branch: BranchDto | undefined;
    halls: LookupDto[];
    tables: LookupDto[];
    productCategories: ProductCategoryDto[];
    products: ProductDto[];
    productCondiments: LookupDto[];
    orders: OrderDto[];

    selectedHall: LookupDto | null;
    selectedOrder?: OrderDto = undefined;
    selectedCategory?: ProductCategoryDto;
    selectedTable?: LookupDto;
    showEmptyTables: boolean;
}

export interface UploadRequest {
    fileName: string | undefined;
    fileDescription: string | undefined;
    fileData: string;
}



