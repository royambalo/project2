import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import {  map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://msbit-exam-products-store.firebaseio.com/products.json';
  constructor(private http:HttpClient){}

   getProducts():Observable<Product[]>{
     return this.http.get<Product[]>(this.apiUrl);
   }
  getSingleProd(id:number):Observable<Product>{
     return this.http.get<Product[]>(this.apiUrl).pipe(map(data=>
      data.find(p=>p.id===id)
    ))
  }

}
