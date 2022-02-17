import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Joueur} from '../models/joueur';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private apiServerUrl = 'http://localhost:8080';

  headers : any;

  constructor(private http: HttpClient,private authService:AuthService) {
    let access_token = authService.getAccessToken();
    this.headers = new Headers();
    this.headers.append('access_token',"Token "+access_token);
  }

  public getJoueurs(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/joueurs/all`,this.headers);
  }

  public addJoueur(joueur : Joueur): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/joueurs/add`,joueur,this.headers);
  }

  public deleteJoueur(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/joueurs/delete/${id}`,this.headers);
  }

  public JoueurParposteEquipe(poste:string,nomequipe:string): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/joueurs/JoueurParposteequipe/${poste}/${nomequipe}`,this.headers);
  }

  public GetEquipeBynomEquipe(nomEquipe:string) : Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/equipes/equipe/${nomEquipe}`,this.headers);
  }
}
