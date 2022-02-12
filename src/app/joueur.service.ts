import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Joueur} from './shared/models/joueur';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getJoueurs(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/joueurs/all`);
  }

  public addJoueur(joueur : Joueur): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/joueurs/add`,joueur);
  }

  public deleteJoueur(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/joueurs/delete/${id}`);
  }

  public JoueurParposteEquipe(poste:string,nomequipe:string): Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/joueurs/JoueurParposteequipe/${poste}/${nomequipe}`);
  }
}
