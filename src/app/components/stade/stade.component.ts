import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import {Stade } from 'src/app/shared/models/stade';
import { StadeService } from 'src/app/shared/services/stade.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Equipe } from 'src/app/shared/models/equipe';
import { Matche } from 'src/app/shared/models/matche';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-stade',
  templateUrl: './stade.component.html',
  styleUrls: ['./stade.component.css']
})
export class StadeComponent implements OnInit {
  public stades : Stade[] = []
  closeResult : String = ""
  public totalRecords  : number = 0
  public page  : number = 1
  public dataContent : any

  constructor(private stadeService  : StadeService , private modelService : NgbModal , private alertService : AlertService) { }

  ngOnInit(): void {
    this.getStades()
  }
  public getStades(){
    this.stadeService.getStades().subscribe(
      (response : Stade[])=>{
        this.totalRecords = response.length
        this.stades = response;
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message);
      }
    )
  }

  public onAddStade(addForm : NgForm){
    console.log(addForm.value)
    this.stadeService.addStade(addForm.value).subscribe(
      (response : Stade)=>{
        this.alertService.success("Satde has been added successfully !")
        this.getStades()
        addForm.resetForm()
      },
      (error : HttpErrorResponse)=>{
        this.alertService.danger("An error accured while adding stade")
      }
    )
  }

  public onDelete(idStade : number)
  {
    this.stadeService.deleteStade(idStade).subscribe(
      (response : Response)=>{
        this.alertService.success("Stade has been deleted successfully !")
        this.getStades()
      },
      (error : HttpErrorResponse)=>{
        this.alertService.danger("An error accured while deleting stade")
      }
    )
  }

  openModal(content : TemplateRef<any> , dataContent : any) {
    this.dataContent = dataContent;
    this.modelService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content : TemplateRef<any>) {
    this.modelService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  matcheInStadeModal(content : TemplateRef<any>, nomStade : String){
    this.stadeService.matcheInStade(nomStade).subscribe(
        (response : Matche[])=>{
          this.dataContent = response;
          for(let item of response)
          {
            console.log(item.equipes)
          }
        },
        (error : HttpErrorResponse)=>{
          this.alertService.warning("There is no Stades to load")
        }
    )
    this.modelService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
