import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com';
  private  apiKey = 'AIzaSyD3zaI1HknZ72bp5_BtyTxePiYEjN84P8U';
  private signUp = '/v1/accounts:signUp?key=';
  private signIn = '/v1/accounts:signInWithPassword?key=';


  constructor(private _http: HttpClient) { }

  signupNewUser(usuario: UserModel){
    const RequestBodyPayload = {
      ...usuario,
      returnSecureToken : true,
    }
    return this._http.post(`${this.url}${this.signUp}${this.apiKey}`, RequestBodyPayload);
  }

  signInWithPassword(usuario: UserModel){
    const RequestBodyPayload = {
      ...usuario,
      returnSecureToken: true,
    }
    return this._http.post(`${this.url}${this.signIn}${this.apiKey}`, RequestBodyPayload);
  }




}
