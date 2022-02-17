import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Arbitre} from '../models/arbitre';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArbitreService {

  private apiServerUrl = 'http://localhost:8080';
  headers : any;

  constructor(private http: HttpClient,private authService:AuthService) {
    let access_token = authService.getAccessToken();
    this.headers =  new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ' http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': ' POST, GET, OPTIONS, DELETE',
      'Access-Control-Max-Age': ' 3600',
      'Access-Control-Allow-Headers': 'Content-Type, Accept, X-Requested-With, remember-me',
      "access_token":access_token,
    });
    console.log(this.headers)
  }

  public getArbitres(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/arbitres/all`, this.headers );
  }

  public addArbitre(arbitre : Arbitre): Observable<any> {
     return this.http.post<any>(`${this.apiServerUrl}/arbitres/add`,arbitre, this.headers);
  }

  public deleteArbitre(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiServerUrl}/arbitres/delete/${id}`, this.headers);
  }

}
