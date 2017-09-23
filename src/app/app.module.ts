import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdCardModule, MdIconModule, MdSlideToggleModule, MdButtonModule,
  MdDialogModule, MdInputModule, MdSnackBarModule, MdProgressSpinnerModule, MdListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

import { AuthModule } from '@modules/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TimelineComponent } from './components/timeline/timeline.component';

import { ProcessesProviderService } from './services';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { ChartCardComponent } from './components/chart-card/chart-card.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { DetailsCardComponent } from './components/details-card/details-card.component';
import { LocationHistoryCardComponent } from './components/location-history-card/location-history-card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    TimelineComponent,
    LocationCardComponent,
    ChartCardComponent,
    LoginFormComponent,
    DetailsCardComponent,
    LocationHistoryCardComponent
  ],
  imports: [
    BrowserAnimationsModule, ReactiveFormsModule,
    BrowserModule, FlexLayoutModule, ChartsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFDbSjZTlSv95RN8QK0w6b97NKFCNgNQY'
    }),
    MdToolbarModule, MdCardModule, MdIconModule, MdSlideToggleModule, MdButtonModule,
    MdDialogModule, MdInputModule, MdSnackBarModule, MdProgressSpinnerModule, MdListModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [
    ProcessesProviderService
  ],
  entryComponents: [LoginFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
