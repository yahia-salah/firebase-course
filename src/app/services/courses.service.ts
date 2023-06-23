import { Injectable } from "@angular/core";
import { Firestore, OrderByDirection } from "@angular/fire/firestore";
import { from, Observable, of } from "rxjs";
import { Course } from "../model/course";
import { concatMap, map, tap } from "rxjs/operators";
import { convertSnaps } from "./db-utils";
import { Lesson } from "../model/lesson";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  setDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  writeBatch,
  startAfter,
} from "firebase/firestore";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private db: Firestore) {}

  createId() {
    // Get the collection reference
    const collectionRef = collection(this.db, "/courses");

    // Generate "locally" a new document for the given collection reference
    const docRef = doc(collectionRef);

    // Get the new document Id
    const documentUuid = docRef.id;

    return documentUuid;
  }

  findLessons(
    courseId: string,
    sortOrder: OrderByDirection = "asc",
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return from(
      getDocs(
        query(
          collection(this.db, `/courses/${courseId}/lessons`),
          orderBy("seqNo", sortOrder),
          limit(pageSize),
          startAfter(pageNumber * pageSize)
        )
      )
    ).pipe(map((results) => convertSnaps<Lesson>(results)));
  }

  findCourseByUrl(courseUrl: string): Observable<Course | null> {
    return from(
      getDocs(
        query(collection(this.db, "/courses"), where("url", "==", courseUrl))
      )
    ).pipe(
      map((results) => {
        const courses = convertSnaps<Course>(results);

        return courses.length == 1 ? courses[0] : null;
      })
    );
  }

  deleteCourseAndLessons(courseId: string) {
    return from(
      getDocs(collection(this.db, `/courses/${courseId}/lessons`))
    ).pipe(
      concatMap((results) => {
        const lessons = convertSnaps<Lesson>(results);

        const batch = writeBatch(this.db);

        const courseRef = doc(this.db, `/courses/${courseId}`);

        batch.delete(courseRef);

        for (let lesson of lessons) {
          const lessonRef = doc(
            this.db,
            `/courses/${courseId}/lessons/${lesson.id}`
          );

          batch.delete(lessonRef);
        }

        return from(batch.commit());
      })
    );
  }

  deleteCourse(courseId: string) {
    return from(deleteDoc(doc(this.db, `/courses/${courseId}`)));
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(updateDoc(doc(this.db, `/courses/${courseId}`), changes));
  }

  createCourse(newCourse: Partial<Course>, courseId?: string) {
    const q = query(
      collection(this.db, "/courses"),
      orderBy("seqNo", "desc"),
      limit(1)
    );

    const querySnapshot$ = from(getDocs(q));

    return querySnapshot$.pipe(
      concatMap((result) => {
        const courses = convertSnaps<Course>(result);

        const lastCourseSeqNo = courses[0]?.seqNo ?? 0;

        const course = {
          ...newCourse,
          seqNo: lastCourseSeqNo + 1,
        };

        let save$: Observable<any>;

        if (courseId) {
          save$ = from(setDoc(doc(this.db, `/courses/${courseId}`), course));
        } else {
          save$ = from(addDoc(collection(this.db, "/courses"), course));
        }

        return save$.pipe(
          map((res) => {
            return {
              id: courseId ?? res.id,
              ...course,
            };
          })
        );
      })
    );
  }

  loadCoursesByCategory(category: string): Observable<Course[]> {
    const q = query(
      collection(this.db, "/courses"),
      where("categories", "array-contains", category)
    );

    const querySnapshot$ = from(getDocs(q));

    return querySnapshot$.pipe(map((result) => convertSnaps<Course>(result)));
  }
}
