import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdCardModule, MdIconModule, MdSlideToggleModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';

import { AuthModule } from '@modules/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';

import { ProcessesProviderService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    TimelineComponent
  ],
  imports: [
    BrowserModule, FlexLayoutModule, ChartsModule,
    HttpClientModule,
    MdToolbarModule, MdCardModule, MdIconModule, MdSlideToggleModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    ProcessesProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
