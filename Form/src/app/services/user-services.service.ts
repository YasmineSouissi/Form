import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  url=' http://localhost:3000/users';
  users: User[]= [];

  constructor(private http: HttpClient) {}
   getUsers(){
      return this.http.get<User[]>(this.url);
   }
   addUser(u: User) {
    return this.http.post<User[]>(this.url, u);
  }
  
  findUserIndexByEmail(email: string): number {
    this.getUsers().subscribe((data: User[]) => {
      this.users = data;
      //console.log("USERS:", this.users); 
    });
    const index = this.users.findIndex(user => user.email === email);
    //console.log(this.users);
    //console.log("findUserIndexByEmail ",index);
    return index;
    
  }
  checkUsersEmail(user: User): boolean {
   
    let index = this.findUserIndexByEmail(user.email);
    //console.log("checkUsersEmail",index!=-1);
    return (index!=-1);
  }
  }
