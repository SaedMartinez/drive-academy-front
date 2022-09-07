import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './_app/app.component';
import { HomeComponent } from './_app/home/home.component';
import { MaterialModule } from './_material/material.module';
import { NavbarComponent } from './_app/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { StudentDetailsComponent } from './_app/student-details/student-details.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    StudentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }