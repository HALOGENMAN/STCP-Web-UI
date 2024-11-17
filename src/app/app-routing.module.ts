import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInSignUpComponent } from './log-in-sign-up/log-in-sign-up.component';
import { TeacherComponent } from './teacher/teacher.component';
import { authGuard } from './shared/guards/auth.guard';
const routes: Routes = [
  {path:'teacher', component:TeacherComponent, canActivate:[authGuard],data:{role:'teacher'}},
  { path: 'loginSignup', component: LogInSignUpComponent },
  { path: '', redirectTo: '/loginSignup', pathMatch: 'full' },
  { path: '**', redirectTo: '/loginSignup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }