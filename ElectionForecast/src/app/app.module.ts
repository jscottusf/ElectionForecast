import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './_components/home/home.component';

import { CSVService } from './_services/csv.service';
import { UsMapComponent } from './_components/us-map/us-map.component';
import { MapStates } from './_services/map.service';
import { ElectoralCollegeComponent } from './_components/electoral-college/electoral-college.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, UsMapComponent, ElectoralCollegeComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [CSVService, MapStates],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
