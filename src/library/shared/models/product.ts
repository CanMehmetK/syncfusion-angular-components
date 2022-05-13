import {LookupDto, PaginationFilter} from '.';
import {BranchDto} from './BranchDto';
import { ServiceType } from './pos';


export class SearchProductsRequest extends PaginationFilter {
    branchId?: string | undefined;
}

export interface UploadDto {
    id: string;
    fileName: string | null;
    fileDescription: string | null;
    fileData: string | null;
}

export class ProductPriceDto {
    portion: string;
    serviceType: ServiceType;
    cost: number;
    price: number;
    barcode: string | null;
}

export class ProductDto {
    id: string;
    productCode: string | null;
    name: string;
    description: string | null;
    printer: string | null;
    kdv: number;
    isKitchenScreenEnabled: boolean;
    isQrMenuEnabled: boolean;
    isFavouriteEnabled: boolean;
    isActive: boolean;
    isKdvEnabled: boolean;
    imagePath: string | null;
    uploadDto: UploadDto;
    branchId: string | null;
    branch: BranchDto | null;
    productCategoryId: string | null;
    productCategory: ProductCategoryDto | null;
    productPrices: ProductPriceDto[];
    productIngredients: ProductIngredientDto[];
}

export interface ProductIngredientDto {
    id: string;
    lookupId: string;
    lookup: LookupDto | null;
    isDefault: boolean;
    extra: boolean;
    price: number;
    unit: number | null;
}

export class SearchProductCategoriesRequest extends PaginationFilter { }


export interface ProductCategoryDto {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    printer: string | null;
    kdv: number;
    isQrMenuEnabled: boolean;
    isActive: boolean;
    branchId: string | null;
    branch: BranchDto | null;
    parentId: string | null;
    parent: ProductCategoryDto | null;
    productCategories: ProductCategoryDto[] | null;
}
