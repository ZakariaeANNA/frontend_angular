import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from 'src/app/shared/models/equipe';
import { Joueur } from 'src/app/shared/models/joueur';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from 'src/app/shared/services/equipe.service';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
  public equipes : Equipe[] = []
  closeResult : String = ""
  public totalRecords  : number = 0
  public page  : number = 1
  public dataContent : any;
  constructor(private equipeService  : EquipeService , private modelService : NgbModal) {}

  ngOnInit(): void {
    this.getEquipes()
  }
  
  public getEquipes(){
    this.equipeService.getEquipes().subscribe(
      (response : Equipe[])=>{
        this.equipes = response
        this.totalRecords = response.length
        console.log(response)
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }

  public onAddEquipe(addForm : NgForm){
    this.equipeService.addEquipe(addForm.value).subscribe(
      (response : Response)=>{
        console.log("data added successfully")
        this.getEquipes()
        addForm.resetForm()
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }

  public onDeleteEquipe(idEquipe : number){
    console.log("hello body")
    console.log(idEquipe)
    this.equipeService.deleteEquipe(idEquipe).subscribe(
      (response : Response)=>{
        console.log("data deleted successfully ")
        this.getEquipes()
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }

  public findByPay(searchForm : NgForm){
      this.equipeService.findEquipeParPay(searchForm.value.pays).subscribe(
        (response : Equipe[])=>
        {
          console.log(response)
          this.equipes = response;
          searchForm.resetForm()
        },
        (error : HttpErrorResponse)=>{
          console.log(searchForm.value.pays)
          console.log(error.message)
        }
      )
  }

  public JoueursEquipe(nomEquipe : String){
    this.equipeService.getEquipes().subscribe(
      (response : Equipe[])=>{
        for (const equipe of response) {
          if(equipe.nomEquipe == nomEquipe){
            console.log(equipe.joueurs)
            this.dataContent = equipe.joueurs;
            return;
          }
        }
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message)
      }
    )
  }

  open(content : TemplateRef<any>) {
    this.modelService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openModal(content : TemplateRef<any> , dataContent : any) {
    this.dataContent = dataContent;
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
