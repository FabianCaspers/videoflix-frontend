import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  users!: any;
  userStatus!: string;
  currentSignedInUserId!: string;
  loggedInUserFromDb!: any;
  user: User = new User;

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.getCurrenctUserCollection();
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.currentSignedInUserId = user.uid;
      }
    });
  }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  getCurrenctUserCollection() {
    this.firestore.collection('user')
      .valueChanges()
      .subscribe((users: any) => {
        this.users = users;
        if (this.currentSignedInUserId) {
          this.getCurrentUser();
        }
      });
  }

  async getCurrentUser() {
    const docRef = this.firestore.collection('user').doc(this.currentSignedInUserId).ref;
    const docSnap = await docRef.get();
    this.loggedInUserFromDb = docSnap.data();
    this.generateUserObject();
  }

  generateUserObject() {
    this.user.firstname = this.loggedInUserFromDb.firstname;
    this.user.lastname = this.loggedInUserFromDb.lastname;
    this.user.email = this.loggedInUserFromDb.email;
    this.user.userId = this.loggedInUserFromDb.userId;
  }

  async register(register: Register): Promise<any> {
    const result = await this.auth.createUserWithEmailAndPassword(register.email, register.password);

    const multiFactor: any = result.user?.multiFactor;
    const uid = multiFactor?.user.uid;

    const user: User = {
      firstname: register.firstname,
      lastname: register.lastname,
      password: register.password,
      email: register.email,
      userId: uid,
    }

    this.firestore.collection('user').doc(uid).set(user);
  }

 
}

type SignIn = {
  email: string;
  password: string;
}


type Register = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
