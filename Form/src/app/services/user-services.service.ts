import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { lib } from 'crypto-js';
import { SHA256 } from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  url=' http://localhost:3000/users';
  users: User[]= [];

  constructor(public http: HttpClient) {}
   getUsers(){
      return this.http.get<User[]>(this.url);
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
    return (index !== -1);
  }
 
  generateSalt(length: number = 16): string {
    const randomBytes = lib.WordArray.random(length);
    const salt = randomBytes.toString();
    return salt;
  }
   hashPassword(password: string): string {
    const hashedPassword = SHA256(password).toString();
    return hashedPassword;
  }
  }
