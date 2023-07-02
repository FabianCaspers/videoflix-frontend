import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;
  public isLoggingIn = false;
  public isLoggingInGuest = false;
  public isRecoveringPassword = false;
  public pwVisible = false;
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
    this.userservice.signIn({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe(() => {
      this.navigateToHome();
    }, (error: any) => {
      this.isLoggingIn = false;
    });
  }

  navigateToHome() {
    this.router.navigate(['home']);
    this.form.reset();
  }

}
