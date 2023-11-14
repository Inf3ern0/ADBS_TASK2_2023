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
    registerUsername: new FormControl(''),
    registerPassword: new FormControl(''),
    firstName: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
  });

  public register() {
    const { registerPassword, registerUsername, firstName, surname, email } =
      this.registerForm.value;

    if (
      !registerUsername ||
      !registerPassword ||
      !email ||
      !firstName ||
      !surname
    )
      return;

    const sub = this.user
      .register(registerUsername, registerPassword, email, firstName, surname)
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
        this.router.navigateByUrl('');
        sub.unsubscribe();
      },
      () => {
        alert('Login failed');
      }
    );
  }
}
