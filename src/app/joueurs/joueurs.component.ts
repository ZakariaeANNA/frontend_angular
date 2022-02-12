import { Component, OnInit } from '@angular/core';
import {Joueur} from '../shared/models/joueur';
import {JoueurService} from '../shared/services/joueur.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit {

  joueurs : Joueur[];
  newJoueur : Joueur;
  newJoueur1 : Joueur;
  closeResult: string = '';
  constructor(private joueurService:JoueurService,private modalService: NgbModal) {
    this.joueurs = [{idJoueur:0,nomJoueur:'karem benzema',poste:'attaquant',nomEquipe:'real madred'},
    {idJoueur:1,nomJoueur:'luis suarez',poste:'attaquant',nomEquipe:'atlitico madred'}];
    this.newJoueur = {idJoueur:0,nomJoueur:'hvrt',poste:'thth',nomEquipe:'thhtrh'}
    this.newJoueur1 = {idJoueur:0,nomJoueur:'',poste:'',nomEquipe:''}
  }

  ngOnInit(): void {
  }

  open(content:any,joueur:Joueur) {
    this.newJoueur = joueur;
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
    this.joueurService.addJoueur(this.newJoueur1);
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

  public getJoueursByposteEquipe(){
    this.joueurService.JoueurParposteEquipe(this.newJoueur.poste,this.newJoueur.nomEquipe)
  }

  
}
