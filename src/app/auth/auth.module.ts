import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from '../components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from '../components/welcome/welcome.component';


@NgModule({
  declarations: [LoginComponent,WelcomeComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,   
    NgbModule,
    FormsModule

  ],
  exports:[
    LoginComponent,
  ]
})
export class AuthModule { }
