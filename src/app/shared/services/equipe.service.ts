import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Equipe } from '../models/equipe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  private apiSrviceUrl = 'http://localhost:8080';
  constructor(private http : HttpClient) { }
  public getEquipes() : Observable<any>{
    return this.http.get<any>(`${this.apiSrviceUrl}/equipes/all`)
  }
  public addEquipe(equipe : Equipe)  : Observable<any>{
    return this.http.post<any>(`${this.apiSrviceUrl}/equipes/add`, equipe);
  }
  public deleteEquipe(id  : number) : Observable<any>{
    return this.http.delete(`${this.apiSrviceUrl}/equipes/delete/${id}`)
  }
  public findEquipeParPay(nomEquipe : String)  : Observable<any>{
    return this.http.get(`${this.apiSrviceUrl}/equipes/findByPays/${nomEquipe}`)
  }
  public getJoueurPequipe(nomEquipe : String) : Observable<any>{
    return this.http.get(`${this.apiSrviceUrl}/equipes/getJoueurParEquipe/${nomEquipe}`)
  }
}
