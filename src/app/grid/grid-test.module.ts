import {Route, RouterModule} from "@angular/router";
import {GridComponent} from "./grid.component";
import {NgModule} from "@angular/core";
import {TreeGridModule} from "@syncfusion/ej2-angular-treegrid";
import {GridModule} from "@syncfusion/ej2-angular-grids";

export const appRoutes: Route[] = [
    // Redirect empty path to default route
    {path: '', component: GridComponent}];

@NgModule({
    declarations: [GridComponent],
    imports: [RouterModule.forChild(appRoutes),
        TreeGridModule,
        GridModule
    ]
})
export class GridTestModule {

}
