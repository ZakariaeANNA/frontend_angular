import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Equipe } from '../models/equipe';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private apiSrviceUrl = 'http://localhost:8080';
  headers:any;

  constructor(private http : HttpClient,private authService:AuthService) {
    let access_token = authService.getAccessToken();
    this.headers = new Headers();
    this.headers.append('access_token',access_token);
   }

  public getEquipes() : Observable<any>{
    return this.http.get<any>(`${this.apiSrviceUrl}/equipes/all`, this.headers)
  }

  public addEquipe(equipe : Equipe)  : Observable<any>{
    return this.http.post<any>(`${this.apiSrviceUrl}/equipes/add`, equipe, this.headers);
  }

  public deleteEquipe(id  : number) : Observable<any>{
    return this.http.delete(`${this.apiSrviceUrl}/equipes/delete/${id}`, this.headers)
  }

  public findEquipeParPay(nomEquipe : String)  : Observable<any>{
    return this.http.get(`${this.apiSrviceUrl}/equipes/findByPays/${nomEquipe}`, this.headers)
  }

  public getJoueurPequipe(nomEquipe : String) : Observable<any>{
    return this.http.get(`${this.apiSrviceUrl}/equipes/getJoueurParEquipe/${nomEquipe}`, this.headers)
  }
  
}
