import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import {
  connectFirestoreEmulator,
  getFirestore,
  provideFirestore,
} from "@angular/fire/firestore";
import { provideAuth, getAuth, connectAuthEmulator } from "@angular/fire/auth";
import {
  provideStorage,
  getStorage,
  connectStorageEmulator,
} from "@angular/fire/storage";
import {
  provideFunctions,
  getFunctions,
  connectFunctionsEmulator,
} from "@angular/fire/functions";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { EditCourseDialogComponent } from "./edit-course-dialog/edit-course-dialog.component";
import { LoginComponent } from "./login/login.component";
import { CoursesCardListComponent } from "./courses-card-list/courses-card-list.component";
import { AppRoutingModule } from "./app-routing.module";
import { CourseComponent } from "./course/course.component";
import { CreateCourseComponent } from "./create-course/create-course.component";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CreateUserComponent } from "./create-user/create-user.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatNativeDateModule } from "@angular/material/core";
import { AuthInterceptor } from "./services/auth.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    LoginComponent,
    CreateCourseComponent,
    CreateUserComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      const firestore = getFirestore();

      if (environment.useEmulators)
        connectFirestoreEmulator(firestore, "localhost", 8091);

      return firestore;
    }),
    provideAuth(() => {
      const auth = getAuth();

      if (environment.useEmulators)
        connectAuthEmulator(auth, "http://localhost:9099");

      return auth;
    }),
    provideStorage(() => {
      const storage = getStorage();

      if (environment.useEmulators)
        connectStorageEmulator(storage, "localhost", 9199);

      return storage;
    }),
    provideFunctions(() => {
      const functions = getFunctions();

      if (environment.useEmulators)
        connectFunctionsEmulator(functions, "localhost", 5001);

      return functions;
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
