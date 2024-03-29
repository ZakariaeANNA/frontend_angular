import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Matche} from '../models/matche';
import {Stade} from '../models/stade';
import { Equipe } from '../models/equipe';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class MatcheService {

  private apiServerUrl = 'http://localhost:8080';

  headers : any; 

  constructor(private http: HttpClient,private authService:AuthService) { 
    let access_token = authService.getAccessToken();
    this.headers = new Headers();
    this.headers.append('access_token',"Token "+access_token);
  }

  public getMatches(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/all`, this.headers);
  }

  public addMatche(matche : Matche): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/matches/add`,matche, this.headers);
  }

  public modifierMatche(matche : Matche): Observable<any> {
    return this.http.put<any>(`${this.apiServerUrl}/matches/update`,matche, this.headers);
  }


  public deleteMatche(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/matches/delete/${id}`, this.headers);
  }

  public getMatchesBydate(date:string): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/matches/find/${date}`, this.headers);
  }

  public getStadeByMatchId(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/findStateById/${id}`, this.headers);
  }

  public getEquipesByMatchID(id:number) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/findEquipesById/${id}`, this.headers);
  }

  public deleteMatchesPasses() :Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/matches/deletePasses`, this.headers);
  }

  public getArbitreBynom(nom:string) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/arbitres/arbitre/${nom}`, this.headers);
  }

  public getStadeBynomStade(nomStade:string) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/stades/stade/${nomStade}`, this.headers);
  }

  public getStadeAndArbitreBynom(nomStade:string,nomArbitre:string) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/findStadeAndArbitre/${nomStade}/${nomArbitre}`, this.headers)
  }
}
