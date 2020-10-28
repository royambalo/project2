import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../models/view.model';
import { ProductsService } from '../services/products.service';


@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.css'],
  host:{class: 'col-6'}
})
export class ProductSingleComponent implements OnInit {
  isSubmited=false
  prodFrom:FormGroup;
  product:Product
  isNotFound=false;
  constructor(private route:ActivatedRoute,private productService:ProductsService,private router:Router) {

   }

  ngOnInit(): void {

    this.route.params.subscribe((param:Params)=>{
      this.productService.getSingle(+param['id'])
      this.productService.selected.subscribe(data=>{this.product=data
        this.prodFrom = new FormGroup({
             name: new FormControl(this.product ? this.product.name : '',[Validators.required]),
             descritpion: new FormControl(this.product ? this.product.description : '',[Validators.required]),
             price: new FormControl(this.product ? this.product.price : 0,[Validators.required,Validators.min(1)])
           })
           this.isSubmited=false
      })
    });
    this.productService.isNotFound.subscribe(data=>{
      this.isNotFound=data
    })
  }
  onSubmit(){
    if(!this.prodFrom.dirty){
      this.router.navigate(['/']);
    }
    this.productService.updateProduct(this.product.id,this.prodFrom.value)
    this.isSubmited=true;
  }



}
