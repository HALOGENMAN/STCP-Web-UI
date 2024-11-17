// src/app/app.module.ts
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfigService } from '../app/shared/services/config.service';
import { LabelsService } from './shared/services/labels.service';
import {LogInSignUpComponent} from './log-in-sign-up/log-in-sign-up.component'
import { HeaderComponent } from './shared/common/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './shared/services/auth.interceptor';

export function initializeApp(labelsService: LabelsService,configService:ConfigService) {
 const labelsPromice: Promise<boolean> = labelsService.load();
 const configPromice: Promise<boolean> = configService.load();
 
 return () => Promise.all([configPromice,labelsPromice,]).then(([config,labels])=>{
    return labels && config;
 })
}

@NgModule({
  declarations: [
    AppComponent,  // Declare all components, pipes, and directives here
    LogInSignUpComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ToastModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    LabelsService,
    ConfigService,
    {provide:APP_INITIALIZER, useFactory: initializeApp, deps:[LabelsService,ConfigService], multi:true},
    MessageService,
    
  ],   // Register services that should be singleton throughout the app
  bootstrap: [AppComponent]  // Main component to bootstrap when the app loads
})
export class AppModule { }