import { PosDto } from './PosDto';



export class BranchDto {
    id?: string;
    name?: string;
    openinHour?: Date | undefined;
    closingHour?: Date | undefined;
    usingHalls?: boolean;
    country?: string | undefined;
    city?: string | undefined;
    currencies?: string | undefined;
    languages?: string | undefined;
    serviceTypes?: string | undefined;
    orderingIntegrations?: string | undefined;
    paymentTypes?: string | undefined;
    posList?: PosDto[];
}


