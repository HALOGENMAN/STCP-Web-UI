declare var google:any
import { Component , OnInit} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AuthService } from '../shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in-sign-up',
  templateUrl: './log-in-sign-up.component.html',
  styleUrl: './log-in-sign-up.component.css',
  animations: [
    trigger('cardHover', [
      state('default', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.1)' })),
      transition('default => hovered', [animate('200ms ease-in')]),
      transition('hovered => default', [animate('200ms ease-out')])
    ])
  ]
})
export class LogInSignUpComponent implements OnInit{
  
  isHoveredForStudent:boolean = false;
  isHoveredForTeacher:boolean = false;
  selectedRole:string="";

  constructor(
    private authService: AuthService, 
    private messageService:MessageService
  ){}

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: 'YOUR_GOOGLE_CLIENT_ID',
      callback: ()=>{

      }
    });

    google.accounts.id.renderButton(
      document.querySelector('.google-btn'),
      {
        type:"standard",
        theme:"filled_blue",
        size:"large",
        shape:"circle",
        text:"signup_with"
      }
    )
  }

  selectRole(role:string):void{
    this.selectedRole = role;
  }

  login(){
    this.authService.login().subscribe({
      next:(res)=>{
        sessionStorage.setItem('token',res.token)
        sessionStorage.setItem('name',res.name)
        sessionStorage.setItem('email',res.email)
        sessionStorage.setItem('role',res.role)
      },
      error:(e)=>{
        this.toast('error','Error',e)
      }
    })
  }

  toast(severity='success',summary='Success',detail = 'Message Content'):void{
    console.log({ severity, summary, detail})
    this.messageService.add({ severity, summary, detail});
  }

}
  