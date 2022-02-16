import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  closeResult="";
  
  constructor(public authService:AuthService,private modalService: NgbModal,private alertService:AlertService) { }
  
  toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
  }
  ngOnInit(): void {
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

  onSubmitRegister(fregister:NgForm){
    fregister.value.birthDate = moment(fregister.value.birthDate).format("DD/MM/yyyy");
    this.authService.register(fregister.value).subscribe(
      (response : any)=>{
        this.alertService.success("Register Success");
      },
      (error: HttpErrorResponse) =>{
        this.alertService.danger("Email Or Username already exists ")
      }
    )
  }

}
