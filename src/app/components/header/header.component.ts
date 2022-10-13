import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Currency } from './currency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  apiData!:Currency[];
  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.exchangeRate.subscribe((res)=>{
      this.apiData = res;
    })
  }
}
