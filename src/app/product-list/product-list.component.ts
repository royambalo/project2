import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(public productsService:ProductsService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

  }
  onNavigate(id:number){
    this.router.navigate(['products',id],{relativeTo:this.route});
  }
  onDelete(index:number){
    this.productsService.deleteProd(index)
    this.router.navigate(['/'])
  }
}
