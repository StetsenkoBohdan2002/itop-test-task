import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../services/app.service';
import { DataApi } from '../models/data.model';
import { Currency } from '../models/currency.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  apiData!: Currency[];
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private appService: AppService) {
    appService
      .getEurUsdData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Currency[]) => {
        this.apiData = this.filterCurrency(res);
      });
  }

  ngOnInit(): void {
  }
  filterCurrency(arr: Currency[]) {
    return arr.filter((item: any) => {
      if (item.cc === 'USD' || item.cc === 'EUR') {
        return true;
      }
      return false;
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
