import { Component } from '@angular/core';
import { User } from '../Model/user';
import { NgForm } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  users: User[]= [];
  user: User=new User();
  constructor(public userServ: UserServicesService){}
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);
  }

  submit(form: NgForm) {
    User.id++; 
    this.userServ.addUser(this.user).subscribe(
        () => {
        this.userServ.getUsers().subscribe((data: User[]) => {
          this.users = data;
          form.reset(); 
          this.user = new User(); 
        });
      },
      (error) => {
      
        console.error('Error adding user:', error);
      }
    );
  }
  
  
  
  
}
