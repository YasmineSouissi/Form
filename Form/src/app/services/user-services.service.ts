import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  url=' http://localhost:3000/users';
  constructor(private http: HttpClient) {}
   getUsers(){
      return this.http.get<User[]>(this.url);
   }
   addUser(u: User){ 
    return this.http.post<User[]>(this.url,u);
   }
  }
