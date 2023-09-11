import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerForm!: FormGroup;
  public isRegistering: boolean = false;
  public pwVisible: boolean = false;
  public namePattern = "[a-zA-Z]+";
  public passwordPattern ="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}";
  public emailPattern ="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  private message: string = '';

  constructor(
    private userservice: UserService,
    private router: Router,
  ) {
    this.registerForm = new FormGroup({
      'first_name': new FormControl('', [Validators.required, Validators.pattern(this.namePattern), Validators.minLength(2), Validators.maxLength(12)]),
      'last_name': new FormControl('', [Validators.required, Validators.pattern(this.namePattern), Validators.minLength(2), Validators.maxLength(12)]),
      'email': new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      'password': new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)])
    });
  }

  register() {
    this.isRegistering = true;
    from(this.userservice.register(this.registerForm.value)).subscribe(() => {
      this.isRegistering = false;
      this.navigateToLogin();
    }, (error: any) => {
      this.isRegistering = false;
    })
}


  navigateToLogin() {
    setTimeout(() => {
      this.router.navigate(['login']);
      this.registerForm.reset();
    }, 3000);
  }
}
