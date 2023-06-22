import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import * as firebaseui from "firebaseui";
// import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from "@angular/router";
import {
  Auth,
  EmailAuthProvider,
  GoogleAuthProvider,
} from "@angular/fire/auth";
// import firebase from 'firebase/app';
// import EmailAuthProvider = firebase.auth.EmailAuthProvider;
// import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  constructor(private afAuth: Auth, private router: Router) {}

  ngOnInit() {
    const uiConfig:firebaseui.auth.Config = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
        GoogleAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
      },
    };

    this.ui = new firebaseui.auth.AuthUI(this.afAuth);
    this.ui.start("#firebaseui-auth-container", uiConfig);

    this.ui.disableAutoSignIn();
  }

  ngOnDestroy() {
    this.ui.delete();
  }

  onLoginSuccessful(result) {
    console.log("Firebase UI result:", result);

    this.router.navigateByUrl("/courses");

    return true;
  }
}
