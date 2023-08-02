import { Component } from '@angular/core';
import { User } from '../Model/user';
import { Form, FormArray, NgForm } from '@angular/forms';
import { UserServicesService } from '../services/user-services.service';
import { Observable, of, switchMap, tap } from 'rxjs';
import { TwilioService } from '../services/twilio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  users: User[]= [];
  user: User=new User();
  userAux: User=new User();
  existingEmail:boolean=false;
  signUpForm!: FormGroup; 
 
  constructor(public userServ: UserServicesService,private router: Router, private route: ActivatedRoute, private twilioService: TwilioService, private formBuilder: FormBuilder){}
  ngOnInit():void {
    this.userServ.getUsers().subscribe(
      (data: User[]) => this.users=data);

      this.signUpForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(".{12}")
      ], 
        ]
      });
  }


  submit(form: FormGroup): Observable<User | User[]> {
    return this.userServ.http.get<User[]>(this.userServ.url).pipe(
      switchMap((users: User[]) => {
        this.user.email = this.signUpForm.get('email')?.value;
        this.user.phoneNumber = this.signUpForm.get('phoneNumber')?.value;
        this.user.password = this.userServ.hashPassword(this.signUpForm.get('password')?.value);
        const existingUser = users.find(u => u.email === this.user.email);
        this.existingEmail = (existingUser !== undefined);
  
        if (existingUser) {
          // form.reset();
          return of(existingUser);
        } else {
          // console.log("before: ", this.user.password);
          // console.log("After: ", this.user.password);
  
          return of(this.user).pipe(
            tap(() => {
              //console.log("Num : ", this.user.phoneNumber);
              this.router.navigate(['/OTP-Verification'], {
                queryParams: {
                  password: this.user.password,
                  phoneNumber: this.user.phoneNumber,
                  email: this.user.email
                }
              });
              form.reset();
              this.user = new User();
            })
          );
        }
      })
    );
  }
  
  onSubmit() {
    this.submit(this.signUpForm).subscribe(
      (response: User | User[]) => {
        if (Array.isArray(response)) {
          console.log('New user added successfully');
        } else {
          console.log('Existing user:', response);
        }
      },
      (error: any) => {
        console.error('Error checking and adding user:', error);
      }
    );
  }

isControlInvalid(controlName: string): boolean {
  const control = this.signUpForm.get(controlName);
  return control ? control.invalid && control.touched : false;
}
public getPhoneNumber(){
  return this.signUpForm.get('phoneNumber')?.value;
}

  /*submit(form: NgForm) {
    User.id++;
    if (!this.userServ.checkUsersEmail(this.user)) {
      this.userServ.addUser(this.user).subscribe(
        () => {
          this.userServ.getUsers().subscribe((data: User[]) => {
            this.users = data;
            form.reset();
            this.user = new User();
            console.log("user added successfully");
          });
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      this.userServ.getUsers().subscribe((data: User[]) => {
        this.users = data;
        this.existingEmail = true;
        console.log("user already exists");
      });
  }*/
}


