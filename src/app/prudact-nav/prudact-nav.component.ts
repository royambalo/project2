import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-prudact-nav',
  templateUrl: './prudact-nav.component.html',
  styleUrls: ['./prudact-nav.component.css']
})
export class PrudactNavComponent implements OnInit {
  sort:string='default'
  search:string
  constructor(private router:Router,private prodService:ProductsService) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['/products/add']);
  }

  onChange(){
   this.prodService.search(this.search); 
  }

  onSort(){
    if(this.sort==='default'){
      return;
    }
    this.prodService.sort(this.sort);

  }

}
