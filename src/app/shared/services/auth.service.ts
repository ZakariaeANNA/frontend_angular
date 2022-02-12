import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/User";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = "http://localhost:8080/";
  helper = new JwtHelperService();
  constructor(private http: HttpClient) { }

  login(user : User){
    return this.http.post(this.authUrl+"login",user);
  }

  register(user : User){
    return this.http.post(this.authUrl+"user/save/",user);
  }
  
  loggedIn(){
    const token = localStorage.getItem("access_token") || "";
    return !this.helper.isTokenExpired(token);
  }
  logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh-token");
  }
  getUsername(){
    const token = localStorage.getItem("access_token") || "";
    if(!this.helper.isTokenExpired(token)){
      var decoded = this.helper.decodeToken(token);
      return decoded.sub;
    }
  }
}
