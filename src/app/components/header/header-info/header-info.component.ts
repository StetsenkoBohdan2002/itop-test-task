import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss']
})
export class HeaderInfoComponent implements OnInit {
  @Input() info:any;
  constructor() { }

  ngOnInit(): void {
  }

}
