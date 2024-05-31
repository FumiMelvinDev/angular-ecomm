import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Pagination, Products } from '../../Types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getAllProducts = (url: string, params: Pagination): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
      observe: 'body',
    });
  };
}
