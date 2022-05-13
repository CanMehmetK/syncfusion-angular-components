export class Search  {
    fields?: string[];
    keyword?: string | undefined;
}
export class BaseFilter  {
    /** Column Wise Search is Supported. */
    advancedSearch?: Search | undefined;
    /** Keyword to Search in All the available columns of the Resource. */
    keyword?: string | undefined;
}

export class PaginationFilter extends BaseFilter {
    pageNumber?: number;
    pageSize?: number;
    orderBy?: string[] | undefined;
}

export interface PaginationResponse<T> {
    data?: T[];
    currentPage?: number;
    totalPages?: number;
    totalCount?: number;
    pageSize?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
    toast: string;
    hasError: boolean;
    messageTitle?: any;
    message: string;
}






