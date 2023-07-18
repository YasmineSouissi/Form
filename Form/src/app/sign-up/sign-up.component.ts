import { Component } from '@angular/core';
import { User } from '../Model/user';
import { Form, FormArray, NgForm } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  users: User[]= [];
  user: User=new User();
  userAux: User=new User();
  existingEmail:boolean=false;
  constructor(public userServ: UserServicesService){}
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);
  }

  submit(form: NgForm): Observable<User | User[]> {
    
    return this.userServ.http.get<User[]>(this.userServ.url).pipe(
      switchMap((users: User[]) => {
        const existingUser = users.find(u => u.email === this.user.email);
        this.existingEmail = (existingUser != undefined);
  
        if (existingUser) {
          return of(existingUser);
        } else {
         //console.log("before: ",this.user.password);
          this.user.password = this.userServ.hashPassword(this.user.password);
          //console.log("After: ",this.user.password);
          return this.userServ.addUser(this.user).pipe(
            tap(() => {
              form.resetForm(); // Reset the form
              this.user = new User();
            })
          );
        }
      })
    );
  }
  

onSubmit(form:NgForm) {
  this.submit(form).subscribe(
    (response: User | User[]) => {
      if (Array.isArray(response)) {
        console.log('New user added successfully');
       
      } else {
        console.log('Existing user:', response);
       
      }
    },
    (error: any) => {
      console.error('Error checking and adding user:', error);
      
    }
  );
}


  /*submit(form: NgForm) {
    User.id++;
    if (!this.userServ.checkUsersEmail(this.user)) {
      this.userServ.addUser(this.user).subscribe(
        () => {
          this.userServ.getUsers().subscribe((data: User[]) => {
            this.users = data;
            form.reset();
            this.user = new User();
            console.log("user added successfully");
          });
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      this.userServ.getUsers().subscribe((data: User[]) => {
        this.users = data;
        this.existingEmail = true;
        console.log("user already exists");
      });
  }*/
}


