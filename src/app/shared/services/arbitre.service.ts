import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Arbitre} from '../models/arbitre';

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  
  }

  public getArbitres(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/arbitres/all`);
  }

  public addArbitre(arbitre : Arbitre): Observable<any> {
     return this.http.post<any>(`${this.apiServerUrl}/arbitres/add`,arbitre);
  }

  public deleteArbitre(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/arbitres/delete/${id}`);
  }

}
