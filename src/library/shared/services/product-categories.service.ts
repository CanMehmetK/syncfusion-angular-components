import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductCategoryDto, PaginationResponse, SearchProductCategoriesRequest } from '../models';

@Injectable({providedIn: 'root'})
export class ProductCategoriesService {
    baseUrl = 'api/v1/productcategories';

    constructor(private _httpClient: HttpClient) {
    }

    // Methods
    get(id: string): Observable<PaginationResponse<ProductCategoryDto>> {
        return this._httpClient.get<PaginationResponse<ProductCategoryDto>>(`${this.baseUrl}/${id}`);
    }

    search(request: SearchProductCategoriesRequest): Observable<PaginationResponse<ProductCategoryDto>> {
        return this._httpClient.post<PaginationResponse<ProductCategoryDto>>(`${this.baseUrl}/search`, request);
    }

    // HttpPost OrderProductsController CreateAsync
    createAsync(request: any): Observable<any> {
        return this._httpClient.post(`${this.baseUrl}`, request);
    }

    // HttpPut OrderProductsController UpdateAsync
    updateAsync(request: any, id: string): Observable<any> {
        request.id = id;
        return this._httpClient.put(`${this.baseUrl}/${id}`, request);
    }


    // HttpDelete OrderProductsController DeleteAsync
    deleteAsync(id: string): Observable<any> {
        return this._httpClient.delete(`${this.baseUrl}/${id}`);
    }

}
