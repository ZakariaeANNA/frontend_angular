import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

const routes: Routes = [
  { path : "login" , component: LoginComponent} ,
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
  { path : "home" , component: WelcomeComponent} ,
  { path: "" , redirectTo: "home" , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
