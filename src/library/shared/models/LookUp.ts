/* eslint-disable @typescript-eslint/naming-convention */
export enum LookupType {
    Hall = 1,
    Table = 2,
    Phone = 3,
    CancelllationReason = 4,
    Ingredient = 5,
    PaymentTypes = 6,
    ServiceTypes = 7,
    OrderingIntegrations = 8,
}


export class searchLookupRequest {
    type?: LookupType | undefined;
    parentId?: string | undefined;
    foreignKey?: string | undefined;
}


export interface LookupDto {
    id: string;
    value: string;
    description: string | null;
    type: LookupType;
    parentId: string | null;
    parent: LookupDto | null;
    customerId: string | null;
    branchId: string | null;
    posId: string | null;
    productId: string | null;
    foreignKey: string | null;
}
