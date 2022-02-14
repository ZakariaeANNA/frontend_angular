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
import { FormControl, FormGroup,FormArray } from '@angular/forms';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  matches : Matche[];
  Data : any
  closeResult: string = '';
  heureMatch = {hour: 13, minute: 30};
  ajouterMatcheForm = new FormGroup({
    dateMatch : new FormControl(),
    heureMatch : new FormControl(),
    stade : new FormGroup({
      idStade : new FormControl(),
      nomStade : new FormControl()
    }),
    arbitre : new FormGroup({
      idArbitre : new FormControl(),
      nom : new FormControl()
    }),
    equipes : new FormArray([
      new FormGroup({
        idEquipe : new FormControl(),
        nomEquipe : new FormControl('')
      }),
      new FormGroup({
        idEquipe : new FormControl(),
        nomEquipe : new FormControl('')
      })
    ])
  })
  modifierMatcheForm = new FormGroup({
    idMatch : new FormControl(),
    dateMatch : new FormControl(),
    heureMatch : new FormControl(),
    stade : new FormGroup({
      idStade : new FormControl(),
      nomStade : new FormControl()
    }),
    arbitre : new FormGroup({
      idArbitre : new FormControl(),
      nom : new FormControl()
    }),
    equipes : new FormArray([
      new FormGroup({
        idEquipe : new FormControl(),
        nomEquipe : new FormControl()
      })
    ])
  })
  constructor(private matcheService:MatcheService,private modalService: NgbModal) {
     
     this.matches = []
  }

  ngOnInit(): void {
    this.getMatches();
  }

  open(content:any,Data:any) {
    this.Data = Data;
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

  public addMatche(){
    console.log(this.ajouterMatcheForm.value)
  }

}
