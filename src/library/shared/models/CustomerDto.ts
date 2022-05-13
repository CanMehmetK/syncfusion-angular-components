/*
* Tenant -> Customer
* Registered Customers themself or by sales
* By default When created has a admin user
* */

import { OrderDto } from './pos';

export interface CustomerDto {
    company?: string;
    title?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    cellPhone?: string;
    email?: string;


    id: string;
    tenantId: string | null;
    name: string;
    addresses: AddressDto[];
    orders: OrderDto[];
    note: string | null;
}



export interface AddressDto {
    id: string;
    tenantId: string;
    address1: string;
    address2: string | null;
    addressDescription: string | null;
    city: string;
    region: string | null;
    mahalle: string | null;
    sokak: string | null;
    cadde: string | null;
    apartmanNo: string | null;
    daireNo: string | null;
    kat: number | null;
    customerId: string;
    customer: CustomerDto;
}
