import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'ngx-alerts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

 
@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    AlertModule.forRoot({maxMessages:5,timeout:5000,positionX:"right"}),
  ],
  providers: [AuthService],
  exports:[
    HeaderComponent
  ]
})
export class SharedModule { }
