import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderInfoComponent } from './components/header/header-info/header-info.component';
import { ConvertComponent } from './components/convert/convert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from './components/services/app.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderInfoComponent,
    ConvertComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
