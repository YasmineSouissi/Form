import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';
import { SHA256 } from 'crypto-js';
import { catchError, switchMap, throwError } from 'rxjs';




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
      return this.getUsers().pipe(
        switchMap((users: User[]) => {
          return this.http.post<User[]>(this.url, u).pipe(
            catchError((error) => {
              console.error('Error adding user:', error);
              return throwError('An error occurred while adding the user. Please try again later.');
            })
          );
        })
      );
    }
  
  findUserIndexByEmail(email: string): number {
    let i = -1; 
    for (let j = 0; j < this.users.length; j++) {
      if (this.users[j].email.localeCompare(email) === 0) {
        i = j;
        break; 
      }
    }
    //console.log("index: ", i);
    return i;
  }
  
  
  
  checkUsersEmail(user: User): boolean {
    return (this.findUserIndexByEmail(user.email) !== -1);
  }
 
  /*generateSalt(length: number = 16): string {
    const randomBytes = lib.WordArray.random(length);
    const salt = randomBytes.toString();
    return salt;
  }*/
  hashPassword(password: string): string {
    const hashedPassword = SHA256(password).toString();
    //console.log("pwd",hashedPassword);
    return hashedPassword;
  }

  }
