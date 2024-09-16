import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LabelsService } from './shared/services/labels.service';
import {ConfigService} from './shared/services/config.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'STCP-Web-UI';
  lables:any;
  config:any;
  constructor(private labelsService:LabelsService, private configService:ConfigService){
    this.lables = labelsService.lables;
    this.config = configService.config
  }
}
