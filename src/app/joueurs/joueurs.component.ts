import { Component, OnInit } from '@angular/core';
import {Joueur} from '../shared/models/joueur';
import {JoueurService} from '../shared/services/joueur.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'ngx-alerts';
import { Equipe } from '../shared/models/equipe';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit {

  joueurs : Joueur[];
  Data : any;
  closeResult: string = '';
  ajouterJoueurForm = new FormGroup({
    nomJoueur : new FormControl(),
    poste : new FormControl(),
    equipe : new FormGroup({
      idEquipe : new FormControl(),
      nomEquipe : new FormControl()
    }),
  })
  modifierJoueurForm = new FormGroup({
    idJoueur : new FormControl(),
    nomJoueur : new FormControl(),
    poste : new FormControl(),
    equipe : new FormGroup({
      idEquipe : new FormControl(),
      nomEquipe : new FormControl(),
      pays : new FormControl()
    }),
  })
  constructor(private joueurService:JoueurService,private modalService: NgbModal,private alertService:AlertService,public authService:AuthService) {
    this.joueurs = [];
  }

  
  ngOnInit(): void {
    this.getJoueurs();

  }

  open(content:any,Data:any) {
    this.Data = Data
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open1(content:any) {
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

  public getJoueurs(): void {
    this.joueurService.getJoueurs().subscribe(
      (response : Joueur[]) => {
        this.joueurs = response;
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public addJoueur(){

    this.joueurService.GetEquipeBynomEquipe(this.ajouterJoueurForm.value.equipe.nomEquipe).subscribe(
      (response : any)=>{
        console.log(response)
        this.ajouterJoueurForm.value.equipe.idEquipe = response.idEquipe
        this.joueurService.addJoueur(this.ajouterJoueurForm.value).subscribe(
           (response : Response)=>{
               this.alertService.success('joueur added with success')
               this.getJoueurs()
           },
           (error : HttpErrorResponse) => {
            this.alertService.danger('joueur not added with succes')
          },
        )
        
      },
      (error : HttpErrorResponse) => {
        this.alertService.danger('equipe not found')
      },
    );
    
  }

  public modifierJoueur(){
     this.joueurService.GetEquipeBynomEquipe(this.modifierJoueurForm.value.equipe.nomEquipe).subscribe(
      (response : any)=>{
        this.modifierJoueurForm.value.equipe.idEquipe = response.idEquipe
        this.modifierJoueurForm.value.equipe.pays = response.pays
        this.joueurService.addJoueur(this.modifierJoueurForm.value).subscribe(
           (response : Response)=>{
               this.alertService.success('joueur modified with success')
               this.getJoueurs()
           },
           (error : HttpErrorResponse) => {
            this.alertService.danger('joueur not modified with succes')
          },
        )
      },
      (error : HttpErrorResponse) => {
        this.alertService.danger('equipe modified not found')
      },
    );
    
  }

  public deleteJoueur(id:number){
    this.joueurService.deleteJoueur(id).subscribe(
      (response : void)=>{
        console.log(response);
        this.getJoueurs();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message)
      },
    );
  }

  public getJoueursByposteEquipe(poste:string,nomEquipe:string){
    this.joueurService.JoueurParposteEquipe(poste,nomEquipe)
  }

  
}
