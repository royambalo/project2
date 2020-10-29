import { Component, OnInit } from '@angular/core';
import { AppinitService } from './INIT/appinit.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Project 2 - Products with Angular';
  constructor(private appinitService: AppinitService) {
    console.log(this.appinitService.data);
  }

  ngOnInit() {}
}
