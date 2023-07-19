import { Component } from '@angular/core';
import { UserServicesService } from '../services/user-services.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  constructor(private userServ : UserServicesService){}
  usersList: User[]=[];
  user: User= new User();
  ngOnInit():void{
    this.userServ.getUsers().subscribe(
      (data: User[])=> this.usersList=data);
    
  }
  addUser(){
    this.userServ.addUser(this.user).subscribe(
      ()=> this.usersList=[this.user,...this.usersList]
    );
  }
    
  
}
