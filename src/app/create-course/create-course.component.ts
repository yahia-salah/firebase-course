import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Firestore } from "@angular/fire/firestore";
import { Course } from "../model/course";
import { catchError, concatMap, last, map, take, tap } from "rxjs/operators";
import { from, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import {
  Storage,
  ref,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from "@angular/fire/storage";
//import firebase from 'firebase/app';
import { Timestamp } from "firebase/firestore";

import { CoursesService } from "../services/courses.service";

@Component({
  selector: "create-course",
  templateUrl: "create-course.component.html",
  styleUrls: ["create-course.component.css"],
})
export class CreateCourseComponent implements OnInit {
  courseId: string;

  percentageChanges$: Observable<number>;

  iconUrl: string;

  form = this.fb.group({
    description: ["", Validators.required],
    category: ["BEGINNER", Validators.required],
    url: [""],
    longDescription: ["", Validators.required],
    promo: [false],
    promoStartAt: [null],
  });

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private afs: Firestore,
    private router: Router,
    private storage: Storage
  ) {}

  uploadThumbnail(event) {
    const file: File = event.target.files[0];

    console.log(file.name);

    const filePath = `courses/${this.courseId}/${file.name}`;

    const storageRef = ref(this.storage, filePath);

    const task = uploadBytesResumable(storageRef, file, {
      cacheControl: "max-age=2592000,public",
    });

    this.percentageChanges$ = percentage(task).pipe(
      map((result) => result.progress)
    );

    task.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () =>
        from(getDownloadURL(task.snapshot.ref))
          .pipe(
            tap((url) => (this.iconUrl = url)),
            catchError((err) => {
              console.log(err);
              alert("Could not create thumbnail url.");
              return err;
            })
          )
          .subscribe()
    );
  }

  ngOnInit() {
    this.coursesService
      .createId()
      .pipe(
        tap((id) => {
          this.courseId = id;
          console.log("new id", this.courseId);
        })
      )
      .subscribe();
  }

  onCreateCourse() {
    const val = this.form.value;

    const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category],
      iconUrl: this.iconUrl ?? "",
    };

    newCourse.promoStartAt = val.promoStartAt
      ? Timestamp.fromDate(val.promoStartAt)
      : null;

    this.coursesService
      .createCourse(newCourse, this.courseId)
      .pipe(
        tap((course) => {
          console.log("Created new course: ", course);
          this.router.navigateByUrl("/courses");
        }),
        catchError((err) => {
          console.log(err);
          alert("Could not create the course.");
          return throwError(err);
        })
      )
      .subscribe();
  }
}
