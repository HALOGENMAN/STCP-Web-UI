import { Component , OnInit} from '@angular/core';



@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent implements OnInit{
  ngOnInit(): void {
    console.log(history.state)
  }
  
}
