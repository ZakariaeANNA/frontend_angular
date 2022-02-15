import { Component, OnInit } from '@angular/core';
import {Arbitre} from '../shared/models/arbitre';
import {ArbitreService} from '../shared/services/arbitre.service';
import { HttpErrorResponse } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-arbitres',
  templateUrl: './arbitres.component.html',
  styleUrls: ['./arbitres.component.css']
})
export class ArbitresComponent implements OnInit {

  arbitres : Arbitre[];
  newArbitre : Arbitre;
  newArbitre1 : Arbitre;
  closeResult: string = '';
  constructor(private arbitreService: ArbitreService,private modalService: NgbModal) {
     this.arbitres = [{idArbitre:0,nom:'grgerg',nationalite:'rgcrgcrger',Matches:[]},
     {idArbitre:1,nom:'yreryey',nationalite:'ergercgerg',Matches:[]}];
     this.newArbitre = {idArbitre:0,nom:'htyhh',nationalite:'hhtrh',Matches:[]};
     this.newArbitre1 = {idArbitre:0,nom:'',nationalite:'',Matches:[]}
  }

  ngOnInit(): void {
    this.getArbitres()
  }

  open(content:any,arbitre:Arbitre) {
    this.newArbitre = arbitre;
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

  public getArbitres(): void {
    this.arbitreService.getArbitres().subscribe(
      (response : Arbitre[]) => {
        this.arbitres = response;
        console.log(response);
      },
      (error : HttpErrorResponse) => {
        alert(error.message)
      },
    );
  }

  public addArbitre(ajouterform:NgForm){
    this.arbitreService.addArbitre(ajouterform.value).subscribe(
      (response : Response)=>{
        console.log(response);
        this.getArbitres();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message)
      },
    );
    console.log(ajouterform.value)
  }

  public modifierArbitre(arbitre:Arbitre){
    this.arbitreService.addArbitre(arbitre).subscribe(
      (response : Response)=>{
        console.log(response);
        this.getArbitres();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message)
      },
    );
    console.log(arbitre)
  }

  public deleteArbitre(id:number){
    this.arbitreService.deleteArbitre(id).subscribe(
      (response : void)=>{
        console.log(response);
        this.getArbitres();
      },
      (error : HttpErrorResponse) => {
        console.log(error.message)
      },
    );
  }

}
