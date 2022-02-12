import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

 
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot()
  ],
  providers: [AuthService],
  exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
