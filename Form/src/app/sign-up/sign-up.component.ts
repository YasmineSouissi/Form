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
  constructor(private userServ: UserServicesService){}
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);
  }

  addUser(){
    this.userServ.addUser(this.user).subscribe(
      ()=> this.users= [this.user,...this.users]
    );
  }

  submit(form: NgForm){
    User.id++;
    /*this.users.push(this.user);*/
    this.userServ.addUser(this.user).subscribe(
      ()=> this.users= [this.user,...this.users]
    );
    console.log(this.users);
    this.user=new User();
    form.reset();
    
  
  }
 
}
