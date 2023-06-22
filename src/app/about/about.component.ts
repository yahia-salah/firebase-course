import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";

import "firebase/firestore";

import { Firestore, collectionData, collection } from "@angular/fire/firestore";
import { COURSES, findLessonsForCourse } from "./db-data";
import { Course } from "../model/course";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent {
  constructor(private db: Firestore) {}

  async uploadData() {
    const coursesCollection = collection(this.db, "courses");
    const courses = collectionData(coursesCollection) as Observable<Course[]>;

    // for (let course of Object.values(COURSES)) {
    //   const newCourse = this.removeId(course);
    //   const courseRef = await coursesCollection.add(newCourse);
    //   const lessons = await courseRef.collection("lessons");
    //   const courseLessons = findLessonsForCourse(course["id"]);
    //   console.log(`Uploading course ${course["description"]}`);
    //   for (const lesson of courseLessons) {
    //     const newLesson = this.removeId(lesson);
    //     delete newLesson.courseId;
    //     await lessons.add(newLesson);
    //   }
    // }
  }

  removeId(data: any) {
    const newData: any = { ...data };
    delete newData.id;
    return newData;
  }
}
