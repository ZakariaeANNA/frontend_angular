import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Matche} from './shared/models/matche';
import {Stade} from './shared/models/stade';
import { Equipe } from './shared/models/equipe';


@Injectable({
  providedIn: 'root'
})
export class MatcheService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getMatches(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/all`);
  }

  public addMatche(matche : Matche): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/matches/add`,matche);
  }

  public deleteMatche(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/matches/delete/${id}`);
  }

  public getMatchesBydate(date:string): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/matches/find/${date}`);
  }

  public getStadeByMatchId(id:number): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/findStateById/${id}`);
  }

  public getEquipesByMatchID(id:number) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/matches/findEquipesById/${id}`);
  }

  public deleteMatchesPasses() :Observable<any> {
    return this.http.delete<any>(`${this.apiServerUrl}/matches/deletePasses`);
  }
}
