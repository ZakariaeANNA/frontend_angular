import { Component, OnInit } from '@angular/core';
import {Matche} from '../shared/models/matche';
import {Arbitre} from '../shared/models/arbitre';
import {Stade} from '../shared/models/stade';
import {Equipe} from '../shared/models/equipe';
import {Joueur} from '../shared/models/joueur';
import { MatcheService } from '../shared/services/matche.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons,NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches : Matche[];
  newMatche : Matche;
  equipes : Equipe;
  joueurs : Joueur;
  arbitre : Arbitre;
  stade : Stade;
  Data : any
  closeResult: string = '';
  constructor(private matcheService:MatcheService,private modalService: NgbModal) {
     
     this.arbitre = {idArbitre:0,nom:'',nationalite:'',Matches:[]}
     this.stade = {idStade:0,nomStade:'',villeStade:'',matches:[]}
     this.joueurs = {idJoueur:0,nomJoueur:'dembele',poste:'attaquant',nomEquipe:'FCB'}
     this.equipes = {idEquipe:0,nomEquipe:'FCB',pays:'Espagne',matches:[],joueurs:[this.joueurs]}
     this.matches = [{idMatch:0,dateMatch:'2022-02-29',heureMatch:'21:30',arbitre:this.arbitre,stade:this.stade,equipes:[this.equipes]}]
     this.newMatche = {idMatch:0,dateMatch:'2022-04-31',heureMatch:'12:30',arbitre:this.arbitre,stade:this.stade,equipes:[this.equipes]}
  }

  ngOnInit(): void {
  }

  open(content:any,Data:any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  openModal(content:any) {
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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

  public getMatches(): void {
    this.matcheService.getMatches().subscribe(
      (response : Matche[]) => {
        this.matches = response;
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public deleteMatche(id:number){
    this.matcheService.deleteMatche(id).subscribe(
      (response : void)=>{
        console.log(response);
        this.getMatches();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message)
      },
    );
  }

}
