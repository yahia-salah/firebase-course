import { Component, OnInit } from "@angular/core";
import {Auth} from '@angular/fire/auth';
import { from, Observable } from "rxjs";
import { concatMap, filter, map } from "rxjs/operators";
import {Firestore} from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { UserService } from "./services/users.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(public user: UserService,) {}

  ngOnInit() {}

  logout() {
    this.user.logout();
}
}
