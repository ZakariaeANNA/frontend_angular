import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Equipe } from 'src/app/shared/models/equipe';
import { Joueur } from 'src/app/shared/models/joueur';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EquipeService } from 'src/app/shared/services/equipe.service';
import { AlertService } from 'ngx-alerts';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private equipeService  : EquipeService , private modelService : NgbModal , private alertService : AlertService,
              public authService:AuthService,private router:Router) {}

  ngOnInit(): void {
    if(!this.authService.loggedIn()){
      this.router.navigate(['/login']);
    }
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
        this.alertService.warning("There is no Teams to load")
      }
    )
  }

  public onAddEquipe(addForm : NgForm){
    this.equipeService.addEquipe(addForm.value).subscribe(
      (response : Response)=>{
        this.alertService.success("The team has been added successfully")
        this.getEquipes()
        addForm.resetForm()
      },
      (error : HttpErrorResponse)=>{
        console.log(error.message)
        this.alertService.danger("An error accured while adding the new Team")
      }
    )
  }

  public onDeleteEquipe(idEquipe : number){
    console.log("hello body")
    console.log(idEquipe)
    this.equipeService.deleteEquipe(idEquipe).subscribe(
      (response : Response)=>{
        this.alertService.success("The Team has been deleted successfully ! ")
        this.getEquipes()
      },
      (error : HttpErrorResponse)=>{
        this.alertService.danger("An error accured while deleting the Team")
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
