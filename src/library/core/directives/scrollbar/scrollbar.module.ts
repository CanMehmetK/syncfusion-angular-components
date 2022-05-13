import { NgModule } from '@angular/core';
import { FuseScrollbarDirective } from 'library/core/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        FuseScrollbarDirective
    ],
    exports     : [
        FuseScrollbarDirective
    ]
})
export class FuseScrollbarModule
{
}
