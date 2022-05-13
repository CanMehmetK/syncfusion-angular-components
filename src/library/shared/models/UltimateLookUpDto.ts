/* eslint-disable @typescript-eslint/naming-convention */

export class searchUltimateLookupRequest {
    type: UltimateLookupType;
    parentId?: string | undefined;
    foreignKey?: string | undefined;
}

export enum UltimateLookupType {
    Country = 0,
    Province = 1,  // İl
    District = 2,  //  L İlçe
    Town = 3,      //     L Mahalle
    Street = 4,    //        L Sokak
    OrderingIntegrations = 5,
    PaymentType = 6,
    ingTitle = 7
}

export class UltimateLookupDto {
    lookupType?: UltimateLookupType;
    parentId?: string | undefined;
    parent?: UltimateLookupDto;
    foreignKey?: string;

    id?: string;
    value?: string;
    description?: string | undefined;
}
