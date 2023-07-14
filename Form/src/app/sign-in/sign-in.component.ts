import { Component } from '@angular/core';
import { User } from '../Model/user';
import { UserServicesService } from '../services/user-services.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user: User=new User();
  email="";
  password=""
  constructor(private userServ: UserServicesService){ }
  users: User[]= [];
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);
  }
  checkUser(){
    this.user.email
    console.log(this.users);
  }
}
