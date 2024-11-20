import { Component , OnInit} from '@angular/core';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{
  userInfo:any = null;
  active = 1;

  constructor(){}

  ngOnInit(): void {
    this.userInfo = history.state.user
  }
  
  navChange(event:any){
    // console.log(event)
  }
}
