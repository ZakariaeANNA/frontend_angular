import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';
import * as moment from 'moment';
import { Token } from "../shared/models/Token";
import { HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { AlertModule, AlertService } from 'ngx-alerts';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  closeResult="";
  model:any;
  tokens : Token;
  helper = new JwtHelperService();

  constructor(private modalService: NgbModal,private authService:AuthService,
    private alertService:AlertService,private router:Router) {
    this.tokens = {access_token : "",refresh_token:""}
  }
  
  ngOnInit(): void {
    if(this.authService.loggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmitLogin(f:NgForm){
    console.log(f.value)
    this.authService.login(f.value).subscribe(
      (response : any)=>{
        this.tokens = response
        localStorage.setItem("access_token",this.tokens.access_token);
        localStorage.setItem("refresh_token",this.tokens.refresh_token);
        this.router.navigate(['/']);
      },
      (error: HttpErrorResponse) =>{
        console.log(error.status);
        if(error.status == 401){
            this.alertService.danger("Username or Password Incorrect.");
        }else if(error.status == 500){
            this.alertService.danger("Password is Incorrect.");
        }
      }
    )
  }
  onSubmitRegister(fregister:NgForm){
    fregister.value.birthDate = moment(fregister.value.birthDate).format("DD/MM/yyyy");
    console.log(fregister.value.birthDate)
    this.authService.register(fregister.value).subscribe(
      (response : any)=>{
        this.alertService.success("Register Success");
      },
      (error: HttpErrorResponse) =>{
        this.alertService.danger("Email Or Username already exists ")
      }
    )
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
