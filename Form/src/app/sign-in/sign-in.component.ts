import { Component } from '@angular/core';
import { User } from '../Model/user';
import { UserServicesService } from '../services/user-services.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user: User = new User();
  constructor(public userServ: UserServicesService) {}
  users: User[] = [];

  ngOnInit(): void {
    this.userServ.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log("USERS:", this.users); // Log the users inside the subscription callback
    });
  }

  /*findUserIndexByEmail(email: string): number {
    const index = this.users.findIndex(user => user.email === email);
    return index;
  }

  checkUsersEmail(email: string): boolean {
    return this.users.some(user => user.email === email);
  }*/

  checkUsersPassword(user:User): boolean {
    const i: number = this.userServ.findUserIndexByEmail(user.email);
    console.log(this.users[i].password === user.password)
    return this.users[i].password === user.password;
  }
}
