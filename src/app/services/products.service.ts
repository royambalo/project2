import { Injectable } from '@angular/core';
import { Product } from '../models/view.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { Responseself } from '../models/response.model';
import * as _ from 'underscore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  prodcuts = new BehaviorSubject<Product[]>([]);
  selected = new BehaviorSubject<Product>(null);
  isNotFound = new BehaviorSubject(false);

  constructor(private api: ApiService) {}

  parseExternalData(arr: Responseself[]):void {
    let parsed: Product[] = [];
    arr.map((item: Responseself) => {
      parsed.push(
        new Product(
          item.id,
          item.description,
          item.name,
          item.price,
          item.thumbnailUrl,
          item.url
        )
      );
    });
    this.prodcuts.next(parsed);
  }

  getFromApi() {
    this.api
      .getProducts()
      .pipe(
        map((data: Responseself[]) => {
          const prodArray: Product[] = [];
          data.map((data) => {
            prodArray.push(
              new Product(
                data.id,
                data.description,
                data.name,
                data.price,
                data.thumbnailUrl,
                data.url
              )
            );
          });
          return prodArray;
        })
      )
      .subscribe(
        (data) => {
          this.prodcuts.next(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getSingle(id: number) {
    if (this.prodcuts.getValue().length) {
      this.selected.next(this.prodcuts.getValue().find((p) => p.id === id));
    } else {
      this.api
        .getProducts()
        .pipe(
          map((data: Responseself[]) => {
            let prod: Product;
            data.map((item: Responseself) => {
              if (item.id === id)
                prod = new Product(
                  item.id,
                  item.description,
                  item.name,
                  item.price,
                  item.thumbnailUrl,
                  item.url
                );
            });
            return prod;
          })
        )
        .subscribe((data) => {
          if (data) {
            this.selected.next(data);
            this.isNotFound.next(false);
          } else this.isNotFound.next(true);
        });
    }
  }

  updateProduct(
    id: number,
    info: { name: string; descritpion: string; price: number }
  ) {
    this.prodcuts.getValue().map((prod) => {
      if (prod.id === id) {
        prod.name = info.name;
        prod.description = info.descritpion;
        prod.price = info.price;
      }
    });
  }
  deleteProd(index: number) {
    this.prodcuts.getValue().splice(index, 1);
  }

  search(input: string) {
    this.api
      .getProducts()
      .pipe(map((data) => data.filter((p) => p.name.includes(input))))
      .subscribe((data) => {
        this.prodcuts.next(data);
      });
  }

  sort(sort: string) {
    this.prodcuts.next(_.sortBy(this.prodcuts.getValue(), [sort]));
  }
  addProd(prod: Product) {
    this.prodcuts.getValue().push(prod);
  }
}
