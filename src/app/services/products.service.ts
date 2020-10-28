import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private prodcuts: Product[] = [];
  selected = new Subject<Product>();

  constructor(private api: ApiService) {
    this.getFromApi();
  }

  getFromApi() {
    this.api.getProducts().subscribe((data: Product[]) => {
      this.prodcuts = data;
    });
  }

  getProducts(): Product[] {
    return this.prodcuts;
  }

  getSingle(id: number) {
    this.api.getSingleProd(id).subscribe((data) => {
      if (data) {
        this.selected.next(data);
      } else {
        this.selected.next(this.prodcuts.find((p) => p.id === id));
      }
    });
  }

  updateProduct(
    id: number,
    info: { name: string; descritpion: string; price: number }
  ) {
    this.prodcuts.map((prod) => {
      if (prod.id === id) {
        prod.name = info.name;
        prod.description = info.descritpion;
        prod.price = info.price;
      }
    });
  }
  deleteProd(index: number) {
    this.prodcuts.splice(index, 1);
  }

  search(input: string) {
    this.api
      .getProducts()
      .pipe(map((data) => data.filter((p) => p.name.includes(input))))
      .subscribe((data) => {
        this.prodcuts = data;
      });
  }

  sort(sort: string) {
    this.prodcuts = _.sortBy(this.prodcuts, [sort]);
  }
  addProd(prod: Product) {
    this.prodcuts.push(prod);
  }
}
