import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit {
  @Input() massage:string
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onClose(){

    this.router.navigate(['/'])
  }

}
