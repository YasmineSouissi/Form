import { Component } from '@angular/core';
import { User } from '../Model/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  users: User[]= [];
  user: User=new User();

  submit(form: NgForm){
    User.id++;
    this.users.push(this.user);
    console.log(this.users);
    this.user=new User();
    form.reset();
  
  }
}
