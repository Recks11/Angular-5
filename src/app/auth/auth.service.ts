import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  token: string;
  constructor(private router: Router) { }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      () => this.router.navigate(['/signIn'])
    ).catch(
      error => console.log(error)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().currentUser.getIdToken().then(
          (token: string) => this.token = token
        );
        this.router.navigate(['/']);
      })
      .catch(
      error => console.log(error)
      );
  }

  signOutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getIdToken() {
    firebase.auth().currentUser.getIdToken().then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
