import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LookupDto, PaginationResponse, ProductCategoryDto, searchLookupRequest} from '../models';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class LookupService {
    baseUrl = 'api/v1/lookup';

    constructor(private _httpClient: HttpClient) {
    }

    // Methods
    get(id: string): Observable<PaginationResponse<LookupDto>> {
        return this._httpClient.get<PaginationResponse<LookupDto>>(`${this.baseUrl}/${id}`);
    }

    searchLookup(request: searchLookupRequest): Observable<PaginationResponse<LookupDto>> {
        return this._httpClient.post<PaginationResponse<LookupDto>>(`${this.baseUrl}/search`, request);
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
