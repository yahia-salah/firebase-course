import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'create-user',
  templateUrl: 'create-user.component.html',
  styleUrls: ['create-user.component.css']
})
export class CreateUserComponent {

    form = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        admin: [false]
    });

  constructor(
      private fb: FormBuilder,
      private http: HttpClient) {

  }

    onCreateUser() {

        const user = this.form.value;

        console.log(user);

        this.http.post(environment.api.createUser,{
          email:user.email,
          password:user.password,
          admin:user.admin
        }).pipe(catchError(err=>{
          console.log(err);
          alert("Couldn't create user!");
          return throwError(()=>err);
        })).subscribe(()=>{
          alert("User created successfully!");
          this.form.reset();
        });

    }

}
