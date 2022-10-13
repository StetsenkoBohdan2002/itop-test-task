import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  exchangeRate = new Subject<any>();
  constructor(private http: HttpClient) {}

  setApiData() {
    this.http
      .get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
      .subscribe((res: any) => {
        const result = res.filter((item: any) => {
          if (item.cc === 'USD' || item.cc === 'EUR') {
            return true;
          }
          return false;
        });
        this.exchangeRate.next(result);
      });
  }
}
