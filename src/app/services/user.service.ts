import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: User = new User();

  private registerUrl = 'https://fabianvideoflix.pythonanywhere.com/authentication/register/';
  private loginUrl = 'https://fabianvideoflix.pythonanywhere.com/authentication/login/';
  private currentUserUrl = 'https://fabianvideoflix.pythonanywhere.com/authentication/current_user/';

  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken'),
      }),
      withCredentials: true,
    };
    return this.http.get<User>(this.currentUserUrl, headers);
  }

  constructor(private http: HttpClient) {}

  register(register: Register): Observable<any> {
    return this.http.post<any>(this.registerUrl, register);
  }

  login(signIn: SignIn): Observable<any> {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken'),
      }),
      withCredentials: true,
    };
    return this.http.post<any>(this.loginUrl, signIn, headers).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  private getCookie(name: string): string {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length == 2) {
      return parts.pop().split(';').shift();
    }
    return '';
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  changeEmail(newEmail: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
        'X-CSRFToken': this.getCookie('csrftoken'),
      }),
      withCredentials: true,
    };
    const url = 'https://teste.fabiancaspers.com/authentication/send-change-email-request/';
    return this.http.post(url, { newEmail }, headers);
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



