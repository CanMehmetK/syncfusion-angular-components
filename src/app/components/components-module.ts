import {Route, RouterModule} from "@angular/router";
import {NgModule} from "@angular/core";
import {ComponentsComponent} from "./components.component";
import {ComboBoxModule, DropDownListModule} from "@syncfusion/ej2-angular-dropdowns";
import {DatePickerModule} from "@syncfusion/ej2-angular-calendars";

export const appRoutes: Route[] = [
    // Redirect empty path to default route
    {path: '', component: ComponentsComponent}];

@NgModule({
    declarations: [ComponentsComponent],
    imports: [RouterModule.forChild(appRoutes), ComboBoxModule, DropDownListModule, DatePickerModule
    ]
})
export class ComponentsModule {

}
