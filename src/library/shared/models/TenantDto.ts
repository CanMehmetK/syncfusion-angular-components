import { OrderDto } from '.';
import {AddressDto, CustomerDto } from './CustomerDto';

export interface TenantDto {
    id?: string;
    name?: string;
    connectionString?: string | undefined;
    adminEmail?: string;
    isActive?: boolean;
    validUpto?: Date;
    issuer?: string | undefined;
}

export class CustomerWithTenantDto implements CustomerDto {
    name: string;
    connectionString?: string | undefined;
    adminEmail?: string;
    isActive?: boolean;
    validUpto?: Date;
    issuer?: string | undefined;

    addresses: AddressDto[];
    cellPhone: string;
    company: string;
    email: string;
    firstName: string;
    fullName: string;
    id: string;
    lastName: string;
    note: string | null;
    orders: OrderDto[];
    phone: string;
    tenantId: string | null;
    title: string;
}

