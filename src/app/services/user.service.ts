import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();

  // Deine Django-Backend-Endpunkte
  private registerUrl = 'http://127.0.0.1:8000/authentication/register/';
  private loginUrl = 'http://127.0.0.1:8000/authentication/login/';

  constructor(private http: HttpClient) {}

  register(register: Register): Observable<any> {
    return this.http.post<any>(this.registerUrl, register);
  }

  login(signIn: SignIn): Observable<any> {
    return this.http.post<any>(this.loginUrl, signIn);
  }

  logout(): void {
    
  }
}

type SignIn = {
  email: string;
  password: string;
};

type Register = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
