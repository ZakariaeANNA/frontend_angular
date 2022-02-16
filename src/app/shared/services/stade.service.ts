import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stade } from '../models/stade';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class StadeService {
  private apiServiceUrl = 'http://localhost:8080'

  headers : any;

  constructor(private http : HttpClient,private authService:AuthService) {
    let access_token = authService.getAccessToken();
    this.headers = new Headers();
    this.headers.append('access_token',access_token);
   }

  public getStades() : Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/stades/all`, this.headers);
  }
  public addStade(stade : Stade) : Observable<any>{
    return this.http.post(`${this.apiServiceUrl}/stades/add`,stade, this.headers);
  }
  public deleteStade(id  : number) : Observable<any>{
    return this.http.delete(`${this.apiServiceUrl}/stades/delete/${id}`, this.headers);
  }
  public matcheInStade(nomStade : String) : Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/stades/matcheinstade/${nomStade}`, this.headers);
  }
}
