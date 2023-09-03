import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public isLoggingIn = false;
  public emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";

  constructor(
    private userservice: UserService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl('', Validators.required)
    });
  }

  login() {
    this.isLoggingIn = true;
    this.userservice.login({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(() => {
      this.navigateToHome();
    }, (error: any) => {
      console.error('Login Error:', error);
      this.isLoggingIn = false;
    });
  }

  navigateToHome() {
    this.router.navigate(['home']);
    this.form.reset();
  }
}
