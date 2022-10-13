import { Component, Input, OnInit } from '@angular/core';
import { AppService } from './components/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'itop';
  apiData!: any;
  constructor(private appService: AppService) {}

  ngOnInit() {
    this.appService.setApiData();
    this.appService.exchangeRate.subscribe((res) => {
      this.apiData = res;
      console.log(res)
    });
  }
}
