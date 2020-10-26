import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './MainPage/main-page/main-page.component';
import { LoginComponent } from './UserManagement/login/login.component';
import { RegistrationComponent } from './UserManagement/registration/registration.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
