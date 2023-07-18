import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { SHA256, lib } from 'crypto-js';



@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  [x: string]: any;
  url=' http://localhost:3000/users';
  users: User[]= [];

  getUsers(){
    return this.http.get<User[]>(this.url);
 }

  constructor(public http: HttpClient) {
      this.getUsers().subscribe((data: User[]) => {
        this.users = data;
        //console.log("Users initilased");
      });
    }
  
  
   addUser(u: User) {
    return this.http.post<User[]>(this.url, u);
  }
  
  findUserIndexByEmail(email: string): number {
    const index = this.users.findIndex(user => user.email === email);
    return index;
  }
  
  
  checkUsersEmail(user: User): boolean {
    const index = this.findUserIndexByEmail(user.email);
    //console.log("user: ",this.users[index]);
    return (index !== -1);
  }
 
  generateSalt(length: number = 16): string {
    const randomBytes = lib.WordArray.random(length);
    const salt = randomBytes.toString();
    return salt;
  }
  hashPassword(password: string): string {
    const hashedPassword = SHA256(password).toString();
    //console.log("pwd",hashedPassword);
    return hashedPassword;
  }

  }
