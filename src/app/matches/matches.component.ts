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
import { FormControl, FormGroup,FormArray, FormBuilder  } from '@angular/forms';
import * as moment from 'moment';
import { AlertService } from 'ngx-alerts';

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
  ajouterMatcheForm1 : any;
  modifierMatcheForm1 : any;
 

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
        nomEquipe : new FormControl()
      }),
      new FormGroup({
        idEquipe : new FormControl(),
        nomEquipe : new FormControl()
      }),
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
  constructor(private matcheService:MatcheService,private modalService: NgbModal,private fb: FormBuilder,private alertService:AlertService) {
     
     this.matches = []
  }

  ngOnInit(): void {
    this.getMatches();
    this.DeleteMatchePass();
    this.ajouterMatcheForm1 = this.fb.group({
      dateMatch: [],
      heureMatch: [],
      stade : this.fb.group({
      idStade: [],
      nomStade: [],
      }),
      arbitre : this.fb.group({
      idArbitre: [],
      nom: []
      }),
      equipes: this.fb.array([
        this.fb.group({
          idEquipe: [],
        }),
        this.fb.group({
          idEquipe: [],
        }),
      ])
    });
    this.modifierMatcheForm1 = this.fb.group({
      idMatch : [],
      dateMatch: [],
      heureMatch: [],
      stade : this.fb.group({
      idStade: [],
      nomStade: [],
      villeStade : [],
      }),
      arbitre : this.fb.group({
      idArbitre: [],
      nom: [],
      nationalite : []
      }),
      equipes: this.fb.array([
        this.fb.group({
          idEquipe: [],
        }),
        this.fb.group({
          idEquipe: [],
        }),
      ])
    });
  }

  open(content:any,Data:any) {
    this.Data = Data;
    console.log(Data.dateMatch)
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
    console.log(id)
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
    console.log(this.ajouterMatcheForm1.value)
    
    this.matcheService.getStadeAndArbitreBynom(this.ajouterMatcheForm1.value.stade.nomStade
      ,this.ajouterMatcheForm1.value.arbitre.nom).subscribe(
        (response : any)=>{
          console.log(response)
          this.ajouterMatcheForm1.value.dateMatch = moment(this.ajouterMatcheForm1.value.dateMatch).format("DD/MM/yyyy");
          this.ajouterMatcheForm1.value.stade.idStade = response.stade.idStade
          this.ajouterMatcheForm1.value.arbitre.idArbitre = response.arbitre.idArbitre
          this.matcheService.addMatche(this.ajouterMatcheForm1.value).subscribe(
             (response : Response)=>{
                 this.alertService.success('matche added with success')
                 this.getMatches()
             },
             (error : HttpErrorResponse) => {
              this.alertService.danger('matche not added with succes')
            },
          )
          
        },
        (error : HttpErrorResponse) => {
          this.alertService.danger('arbitre or stade not found')
        },
      )
  }

  public modifierMatche(){
    console.log(this.modifierMatcheForm1.value)
    this.matcheService.getStadeAndArbitreBynom(this.modifierMatcheForm1.value.stade.nomStade
      ,this.modifierMatcheForm1.value.arbitre.nom).subscribe(
        (response : any)=>{
          console.log(response)
          this.modifierMatcheForm1.value.dateMatch = moment(this.modifierMatcheForm1.value.dateMatch).format("DD/MM/yyyy");
          this.modifierMatcheForm1.value.stade = response.stade
          this.modifierMatcheForm1.value.arbitre = response.arbitre
          this.matcheService.modifierMatche(this.modifierMatcheForm1.value).subscribe(
             (response : Response)=>{
                 this.alertService.success('matche modified with success')
                 this.getMatches()
             },
             (error : HttpErrorResponse) => {
              this.alertService.danger('matche not modified with succes')
            },
          )
          
        },
        (error : HttpErrorResponse) => {
          this.alertService.danger('arbitre or stade modified not found')
        },
      )
  }

  get getequipes(): FormArray {
    return this.ajouterMatcheForm1.get('equipes') as FormArray;
  }

  get getequipesmodifiers(): FormArray {
    return this.modifierMatcheForm1.get('equipes') as FormArray;
  }

  newEquipe(): FormGroup {
    return this.fb.group({
      idEquipe: [],
      nomEquipe: []
    });
  }

  newEquipeModifier(): FormGroup {
    return this.fb.group({
      idEquipe: [],
    });
  }

  public addEquipeInput(idEquipe=0,nomEquipe=''){
    const equipes = this.ajouterMatcheForm1.get('equipes') as FormArray;
    equipes.push(this.newEquipe());
  }

  public addEquipeModifierInput(){
    const equipes = this.modifierMatcheForm1.get('equipes') as FormArray;
    equipes.push(this.newEquipeModifier());
  }

  public DeleteMatchePass(){
    this.matcheService.deleteMatchesPasses()
  }
}
