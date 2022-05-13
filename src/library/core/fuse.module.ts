import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MATERIAL_SANITY_CHECKS} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {FuseConfirmationModule} from 'app/core/confirmation/confirmation.module';
import {FuseLoadingModule} from 'library/core/services/loading';
import {FuseMediaWatcherModule} from 'library/core/services/media-watcher/media-watcher.module';
import {FuseSplashScreenModule} from 'library/core/services/splash-screen/splash-screen.module';
import {FuseUtilsModule} from 'library/core/services/utils/utils.module';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import 'moment/locale/tr';
import 'moment/locale/en-gb';
import 'moment/locale/ar';
import 'moment/locale/fr';
import {TranslocoService} from '@ngneat/transloco';

@NgModule({
    imports: [
        FuseConfirmationModule,
        FuseLoadingModule,
        FuseMediaWatcherModule,
        FuseSplashScreenModule,
        FuseUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide: MATERIAL_SANITY_CHECKS,
            useValue: {doctype: true, theme: false, version: true}
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'fill'}
        },
        // TODO: useFactory to setup date format by app language
        {provide: MAT_DATE_LOCALE,  useValue: 'tr'},
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
        },
        {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
        // {
        //     provide: MAT_DATE_FORMATS,
        //     useValue: {
        //         parse: {
        //             dateInput: moment.ISO_8601
        //         },
        //         display: {
        //             dateInput: 'll',
        //             monthYearLabel: 'MMM YYYY',
        //             dateA11yLabel: 'LL',
        //             monthYearA11yLabel: 'MMMM YYYY'
        //         }
        //     }
        // }
    ]
})
export class FuseModule {
    /**
     * Constructor
     */
    constructor(private _translocoService: TranslocoService,
                @Optional() @SkipSelf() parentModule?: FuseModule) {
        if (parentModule) {
            throw new Error('FuseModule has already been loaded. Import this module in the AppModule only!');
        }
    }

}
