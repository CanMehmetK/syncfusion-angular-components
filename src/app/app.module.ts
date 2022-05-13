import {ButtonModule, CheckBoxModule} from '@syncfusion/ej2-angular-buttons';

import {ComboBoxModule, DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DatePickerModule} from '@syncfusion/ej2-angular-calendars';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LayoutComponent} from './layout/layout.component';
import {ExtraOptions, PreloadAllModules, Route, RouterModule} from "@angular/router";
import {ComponentsComponent} from './components/components.component';
import {ToastModule} from "@syncfusion/ej2-angular-notifications";
import {MatButtonModule} from "@angular/material/button";

export const appRoutes: Route[] = [
    // Redirect empty path to default route
    {path: '', pathMatch: 'full', redirectTo: 'components'},
    {
        path: '', component: LayoutComponent, children: [
            {path: 'components', loadChildren: () => import('app/components/components-module').then(m => m.ComponentsModule)},
            {path: 'grid', loadChildren: () => import('app/grid/grid-test.module').then(m => m.GridTestModule)},
        ]
    },
];
const routerConfig: ExtraOptions = {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [AppComponent, LayoutComponent],
    imports: [BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, routerConfig), ToastModule, MatButtonModule, ButtonModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
