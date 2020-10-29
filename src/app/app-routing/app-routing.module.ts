import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductAddComponent } from '../product-add/product-add.component';
import { ProductEmptyComponent } from '../product-empty/product-empty.component';
import { ProductMainComponent } from '../product-main/product-main.component';
import { ProductSingleComponent } from '../product-single/product-single.component';

const appRoutes:Routes = [
  {path:'',component:ProductMainComponent,
  children:[
    {path:'', component:ProductEmptyComponent, pathMatch:'full'},
    {path:'products/add',component:ProductAddComponent},
    {path:'products/:id', component:ProductSingleComponent},
  ]},
  {path:'**', redirectTo: ''},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
