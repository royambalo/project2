import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  host:{class:'col-6'}
})
export class ProductAddComponent implements OnInit {
 addForm:FormGroup;
  id:number
  isAdded=false;
  constructor(private productService:ProductsService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      name: new FormControl(null,[Validators.required]),
      description: new FormControl(null,[Validators.required]),
      price: new FormControl(1,[Validators.min(1)]),
    })

  }

  onSubmit(){
    console.log(this.addForm.value)
    this.id=Math.floor(Math.random()*1000)
    const prod={
      id:this.id,
      description: this.addForm.value.description,
      name: this.addForm.value.name,
      price:this.addForm.value.price,
      thumbnailUrl:'http://placehold.it/150/92c952',
      url:'http://placehold.it/150/92c952'
    }
    this.productService.addProd(prod)
    this.isAdded=true;
  }

}
