import { Component } from '@angular/core';
import { User } from '../Model/user';
import { NgForm } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  users: User[]= [];
  user: User=new User();
  existingEmail:boolean=false;
  constructor(public userServ: UserServicesService){}
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);
  }

  submit(): Observable<User | User[]> {
    return this.userServ.http.get<User[]>(this.userServ.url).pipe(
      switchMap((users: User[]) => {
        const existingUser = users.find(u => u.email === this.user.email);
        this.existingEmail=(existingUser!=undefined);
        //console.log("existing user:",existingUser);
        if (existingUser) {
        //console.log("existing user:",existingUser);
          return of(existingUser);
        } else {
        //console.log("existing user:",existingUser);
          return this.userServ.addUser(this.user);
        }
      })
    );
  }

onSubmit() {
  this.submit().subscribe(
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


