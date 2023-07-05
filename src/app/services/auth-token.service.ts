import { Auth, User, user, authState } from "@angular/fire/auth";
import { Injectable } from "@angular/core";
import { from, map, of, switchMap, take } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthTokenService {
  authJwtToken: string;

  constructor(private afAuth: Auth) {
    from(authState(this.afAuth)).pipe(
        take(1),
        switchMap((user) => {
          if (user) return from(user.getIdTokenResult());
          else return of(null);
        })
      ).subscribe(token=>this.authJwtToken = token.token);
  }
}
