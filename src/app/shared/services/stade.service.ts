import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stade } from '../models/stade';
@Injectable({
  providedIn: 'root'
})
export class StadeService {
  private apiServiceUrl = 'http://localhost:8080'
  constructor(private http : HttpClient) { }

  public getStades() : Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/stades/all`);
  }
  public addStade(stade : Stade) : Observable<any>{
    return this.http.post(`${this.apiServiceUrl}/stades/add`,stade);
  }
  public deleteStade(id  : number) : Observable<any>{
    return this.http.delete(`${this.apiServiceUrl}/stades/delete/${id}`);
  }
  public matcheInStade(nomStade : String) : Observable<any>{
    return this.http.get(`${this.apiServiceUrl}/stades/matcheinstade/${nomStade}`);
  }
}
