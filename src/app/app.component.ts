import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './components/services/app.service';
import { DataApi } from './components/models/data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'itop';
  apiData!: any;
  constructor() {

  }

  ngOnInit() {  
  }
}
