import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent {
  constructor(private user: UserService, private router: Router) {}

  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public registerForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
  });

  public register() {
    const { password, username, firstName, surname, email } =
      this.registerForm.value;

    if (!username || !password || !email || !firstName || !surname) return;

    const sub = this.user
      .register(username, password, email, firstName, surname)
      .subscribe(
        ({ message }) => {
          alert(message);
          this.registerForm.reset();
          sub.unsubscribe();
        },
        () => {
          alert('Register failed');
        }
      );
  }

  public login() {
    const { password, username } = this.loginForm.value;

    if (!username || !password) return;

    const sub = this.user.login(username, password).subscribe(
      () => {
        this.router.navigateByUrl('complaints');
        sub.unsubscribe();
      },
      () => {
        alert('Login failed');
      }
    );
  }
}