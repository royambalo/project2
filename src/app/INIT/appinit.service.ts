import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responseself } from '../models/response.model';
import { ApiService } from '../services/api.service';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root',
})
export class AppinitService {
  private apiUrl: string =
    'https://msbit-exam-products-store.firebaseio.com/products.json';
  private resData: Responseself[] = [];

  get data(): Responseself[] {
    return this.resData;
  }
  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {}

  public load(): Promise<any> {
    return new Promise((res, rej) => {
      this.http.get<Responseself[]>(this.apiUrl).subscribe((data) => {
        this.productService.parseExternalData(data);
        res(true);
      });
    });
  }
}
