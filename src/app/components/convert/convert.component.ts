import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss'],
})
export class ConvertComponent implements OnInit, OnDestroy {
  firstForm: FormGroup = new FormGroup({
    firstInput: new FormControl(''),
    firstSelect: new FormControl('USD'),
  });
  secondForm: FormGroup = new FormGroup({
    secondInput: new FormControl(''),
    secondSelect: new FormControl('UAH'),
  });
  loading:boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private appService: AppService) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  mainFunction(
    mainInput: number,
    mainForm: FormGroup,
    name: string,
    reverse: boolean
  ) {
    if (!mainInput) {
      mainForm.setControl('secondInput', new FormControl());
      return;
    }
    this.loading = true;
    if (!reverse) {
      this.appService
        .setApiData(
          this.firstForm.value.firstSelect,
          this.secondForm.value.secondSelect,
          mainInput
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          mainForm.setControl(name, new FormControl(res.result));
          this.loading = false;
        });
    } else {
      this.appService
        .setApiData(
          this.secondForm.value.secondSelect,
          this.firstForm.value.firstSelect,
          mainInput
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          mainForm.setControl(name, new FormControl(res.result));
          this.loading = false;
        });
    }
  }
  checkResult(reverse = false) {
    const { firstInput } = this.firstForm.value;
    const { secondInput } = this.secondForm.value;
    if (!reverse) {
      this.mainFunction(firstInput, this.secondForm, 'secondInput', reverse);
    } else {
      this.mainFunction(secondInput, this.firstForm, 'firstInput', reverse);
    }
  }
}
