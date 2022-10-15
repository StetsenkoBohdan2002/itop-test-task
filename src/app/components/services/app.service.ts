import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { DataApi } from '../models/data.model';
import { Currency } from '../models/currency.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  setApiData(firstValue:string, secondValue:string, amount:number) {
    const httpOptions = {
      headers: new HttpHeaders().set(
        'apikey',
        'PSBDIhDKw5W9ccc9jrVMdkT9t9P4iG2E'
      ),
    };
    return this.http
      .get<DataApi>(
        `https://api.apilayer.com/exchangerates_data/convert?to=${secondValue}&from=${firstValue}&amount=${amount}`,
        httpOptions
      )
  }
  getEurUsdData() {
    return this.http
      .get<Currency[]>('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  }
}
