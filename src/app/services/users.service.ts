import { Injectable } from "@angular/core";
import { Observable, from, of } from "rxjs";
import { Auth, User, user, authState } from "@angular/fire/auth";
import { map, switchMap, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserRoles } from "../model/user-roles";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user$: Observable<User>;

  isLoggedIn$: Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string>;

  roles$: Observable<UserRoles>;

  constructor(private afAuth: Auth, private router: Router) {
    this.user$ = user(this.afAuth);

    this.isLoggedIn$ = this.user$.pipe(map((user) => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.pictureUrl$ = this.user$.pipe(
      map((user) => (user ? user.photoURL : null))
    );

    this.roles$ = from(authState(this.afAuth)).pipe(
      take(1),
      switchMap((user) => {
        if (user) return from(user.getIdTokenResult());
        else return of(null);
      }),
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl("/login");
  }
}
