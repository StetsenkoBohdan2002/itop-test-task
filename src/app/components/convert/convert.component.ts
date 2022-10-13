import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit {
  firstValue!: any;
  secondValue!: any;
  firstSelect: string = 'USD';
  secondSelect: string = 'UAH';
  usd!: any;
  eur!: any;
  @ViewChild('firstInput') firstInput!: ElementRef<HTMLInputElement>;
  @ViewChild('secondInput') secondInput!: ElementRef<HTMLInputElement>;
  @ViewChild('errorModal') errorModal!: ElementRef<HTMLElement>;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.exchangeRate.subscribe((res) => {
      this.usd = res[0];
      this.eur = res[1];
    });
  }
  changeDisable(
    firstElement: ElementRef<HTMLInputElement>,
    secondElement: ElementRef<HTMLInputElement>,
    value: boolean
  ) {
    if (value) {
      this.errorModal.nativeElement.classList.add('show');
    } else {
      this.errorModal.nativeElement.classList.remove('show');
    }
    firstElement.nativeElement.disabled = value;
    secondElement.nativeElement.disabled = value;
  }
  resetValue() {
    this.secondValue = '';
    this.firstValue = '';
  }
  checkResult(value: any, reverse = false) {
    if (value) {
      if (this.firstSelect === this.secondSelect) {
        this.resetValue();
        this.changeDisable(this.firstInput, this.secondInput, true);
        return;
      }
      this.changeDisable(this.firstInput, this.secondInput, false);
      if (this.firstValue === this.secondValue) {
        return;
      }
      if (this.firstSelect === 'USD') {
        if (this.secondSelect === 'UAH') {
          if (reverse) {
            this.firstValue = (this.secondValue / this.usd.rate).toFixed(4);
          } else {
            this.secondValue = (this.firstValue * this.usd.rate).toFixed(4);
          }
        } else if (this.secondSelect === 'EUR') {
          if (reverse) {
            this.firstValue = (
              (this.eur.rate * this.secondValue) /
              this.usd.rate
            ).toFixed(4);
          } else {
            this.secondValue = (
              (this.usd.rate * this.firstValue) /
              this.eur.rate
            ).toFixed(4);
          }
        }
      } else if (this.firstSelect === 'EUR') {
        if (this.secondSelect === 'UAH') {
          if (reverse) {
            this.firstValue = (this.secondValue / this.eur.rate).toFixed(4);
          } else {
            this.secondValue = (this.firstValue * this.eur.rate).toFixed(4);
          }
        } else if (this.secondSelect === 'USD') {
          if (reverse) {
            this.firstValue = (
              (this.secondValue * this.usd.rate) /
              this.eur.rate
            ).toFixed(4);
          } else {
            this.secondValue = (
              (this.firstValue * this.eur.rate) /
              this.usd.rate
            ).toFixed(4);
          }
        }
      } else {
        if (this.secondSelect === 'EUR') {
          if (reverse) {
            this.firstValue = (this.secondValue * this.eur.rate).toFixed(4);
          } else {
            this.secondValue = (this.firstValue / this.eur.rate).toFixed(4);
          }
        } else if (this.secondSelect === 'USD') {
          if (reverse) {
            this.firstValue = (this.secondValue * this.usd.rate).toFixed(4);
          } else {
            this.secondValue = (this.firstValue / this.usd.rate).toFixed(4);
          }
        }
      }
    } else {
      this.resetValue();
    }
  }
}
