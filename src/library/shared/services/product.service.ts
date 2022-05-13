import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaginationResponse, ProductDto, SearchProductsRequest} from '../models';


@Injectable({providedIn: 'root'})
export class ProductService {
    baseUrl = 'api/v1/products';

    constructor(private _httpClient: HttpClient) {
    }

    // Methods
    get(id: string): Observable<PaginationResponse<ProductDto>> {
        return this._httpClient.get<PaginationResponse<ProductDto>>(`${this.baseUrl}/${id}`);
    }

    // HttpPost OrderProductsController SearchAsync
    search(request: SearchProductsRequest): Observable<PaginationResponse<ProductDto>> {
        return this._httpClient.post<PaginationResponse<ProductDto>>(`${this.baseUrl}/search`, request);
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
