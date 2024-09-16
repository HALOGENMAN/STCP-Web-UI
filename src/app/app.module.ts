// src/app/app.module.ts
import { NgModule, APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from '../app/shared/services/config.service';
import { LabelsService } from './shared/services/labels.service';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule  // Import other Angular modules here (e.g., FormsModule, HttpClientModule)
  ],
  providers: [
    provideHttpClient(),
    LabelsService,
    ConfigService,
    {provide:APP_INITIALIZER, useFactory: initializeApp, deps:[LabelsService,ConfigService], multi:true}
  ],   // Register services that should be singleton throughout the app
  bootstrap: [AppComponent]  // Main component to bootstrap when the app loads
})
export class AppModule { }