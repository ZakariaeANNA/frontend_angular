import { Component, OnInit } from '@angular/core';
import {Matche} from '../shared/models/matche';
import {Arbitre} from '../shared/models/arbitre';
import {Stade} from '../shared/models/stade';
import {Equipe} from '../shared/models/equipe';
import {Joueur} from '../shared/models/joueur';
import { MatcheService } from '../matche.service';
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
  newMatche1 : Matche;
  equipesM : Equipe;
  joueursM : Joueur;
  arbitreM : Arbitre;
  stadeM : Stade;
  closeResult: string = '';
  constructor(private matcheService:MatcheService,private modalService: NgbModal) {
     
     this.arbitreM = {idArbitre:0,nom:'',nationalite:'',Matches:[]}
     this.stadeM = {idStade:0,nomStade:'',villeStade:'',matches:[]}
     this.joueursM = {idJoueur:0,nomJoueur:'dembele',poste:'attaquant',nomEquipe:'FCB'}
     this.equipesM = {idEquipe:0,nomEquipe:'FCB',pays:'Espagne',matches:[],joueurs:[this.joueursM]}
     this.matches = [{idMatch:0,dateMatch:'2022-02-29',heureMatch:'21:30',arbitre:this.arbitreM,stade:this.stadeM,equipes:[this.equipesM]}]
     this.newMatche = {idMatch:0,dateMatch:'2022-04-31',heureMatch:'12:30',arbitre:this.arbitreM,stade:this.stadeM,equipes:[this.equipesM]}
     this.newMatche1 = {idMatch:0,dateMatch:'',heureMatch:'',arbitre:this.arbitreM,stade:this.stadeM,equipes:[]}
  }

  ngOnInit(): void {
  }

  open(content:any,matche:Matche) {
    this.newMatche = matche;
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

  openequipe(content:any,matchepass:Matche) {
    
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openjoueur(content:any,matchepass:Matche) {
    
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
