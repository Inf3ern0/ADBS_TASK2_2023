import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';

const url = 'http://localhost:3000/api';

type Auth = {
  token: string;
};

type Register = {
  message: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient, public router: Router) {}

  private token = new BehaviorSubject<string | undefined>(undefined);

  public get getToken() {
    return this.token.value;
  }

  public isAuthenticated() {
    if (this.token.value) return true;
    return false;
  }

  public login(username: string, password: string) {
    return this.http
      .post<Auth>(`${url}/users/login`, {
        username,
        password,
      })
      .pipe(
        map(({ token }) => {
          this.token.next(token);

          return true;
        })
      );
  }

  public register(
    username: string,
    password: string,
    email: string,
    firstName: string,
    surname: string
  ) {
    return this.http.post<Register>(`${url}/users/signup`, {
      username,
      password,
      email,
      first_name: firstName,
      surname,
    });
  }

  public logout() {
    this.token.next(undefined);
    this.router.navigateByUrl('auth');
  }
}
