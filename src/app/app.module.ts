import {CheckBoxModule} from '@syncfusion/ej2-angular-buttons';

import {ComboBoxModule, DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,

        ComboBoxModule,
        DropDownListModule,
        DatePickerModule,
        CheckBoxModule,],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
