import { Component } from '@angular/core';
import { User } from '../Model/user';
import { UserServicesService } from '../services/user-services.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  user: User = new User();
  existingEmail:boolean=true;
  wrongPassword:boolean=false;
  signInForm!: FormGroup; 
    constructor(public userServ: UserServicesService,private router: Router,private formBuilder: FormBuilder) { 
    
  }
  
  users: User[] = [];

  ngOnInit(): void {
    this.userServ.getUsers().subscribe((data: User[]) => {
      this.users = data;
      console.log("USERS:", this.users); // Log the users inside the subscription callback
    });

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  /*findUserIndexByEmail(email: string): number {
    const index = this.users.findIndex(user => user.email === email);
    return index;
  }

  checkUsersEmail(email: string): boolean {
    return this.users.some(user => user.email === email);
  }*/

  checkUsersPassword(user: User): boolean {
    user.email=this.signInForm.get("email")?.value;
    const i: number = this.userServ.findUserIndexByEmail(user.email);
    //console.log("email : ", user.email);
    if (i !== -1) {
      
      const enteredPasswordHash = this.userServ.hashPassword(user.password); 
      console.log(enteredPasswordHash);
      const isPasswordMatch = enteredPasswordHash === this.users[i].password; 
      console.log(isPasswordMatch);
      return isPasswordMatch;
    } else {
      this.existingEmail = false;
      return false;
    }

  }
  signIn(user: User){
    user.email=this.signInForm.get("email")?.value;
    user.password=this.signInForm.get("password")?.value;
    const pwdIsCorrect=this.checkUsersPassword(user);
    if(pwdIsCorrect){
      this.router.navigate(['/Home']);
      console.log("Correct Password");
    }
    else{
      console.log("Incorrect Password");
      this.wrongPassword=true;
    }
    
    }

    isFormValid() {
      return this.signInForm.valid;
    }
    isControlInvalid(controlName: string): boolean {
      const control = this.signInForm.get(controlName);
      return control ? control.invalid && control.touched : false;
    }
  
}


