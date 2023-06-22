import { inject } from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Course} from "../model/course";
import {CoursesService} from "./courses.service";
import {Observable} from "rxjs";

export const CourseResolver:ResolveFn<Course> = (route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot, coursesService:CoursesService = inject(CoursesService)): Observable<Course> => {

        const courseUrl = route.paramMap.get("courseUrl");

        return coursesService.findCourseByUrl(courseUrl);
    }