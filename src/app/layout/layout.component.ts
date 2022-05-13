import {Component, OnInit} from '@angular/core';
import {ToastUtility} from "@syncfusion/ej2-angular-notifications";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    position: any;
    public toastObj;

    constructor() {
    }

    ngOnInit(): void {
    }

    public showToast($event: any): void {
        this.toastObj = ToastUtility.show({
            title: 'Toast Title',
            content: 'Toast shown using utility function with ToastModel',
            timeOut: 20000,
            position: {X: 'Right', Y: 'Bottom'},
            showCloseButton: true,
            click: this.toastClick.bind(this),
            buttons: [{
                model: {content: 'Close'}, click: this.toastClose.bind(this)
            }]
        });
    }

    public toastClose(): void {
        this.toastObj.hide();
    }

    public toastClick(): void {
        console.log('Toast click event is triggered');
    }
}
