import { Component, OnInit } from '@angular/core';
import {Joueur} from '../shared/models/joueur';
import {JoueurService} from '../shared/services/joueur.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

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
      nomEquipe : new FormControl()
    }),
  })
  constructor(private joueurService:JoueurService,private modalService: NgbModal) {
    this.joueurs = [];
  }

  
  ngOnInit(): void {
    this.getJoueurs();
  }

  open(content:any,Data:any) {
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
      },
      (error : HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public addJoueur(){
    //this.joueurService.addJoueur(joueur);
    console.log(this.ajouterJoueurForm.value);
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
