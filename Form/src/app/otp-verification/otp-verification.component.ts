import { Component, Input } from '@angular/core';
import { TwilioService } from '../services/twilio.service';
import { User } from '../Model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../services/user-services.service';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OTPVerificationComponent {

  user : User= new User(); 
  phoneNumber="";
  email=""
  entredCode: string='';
  codeDigits: string[] = ['', '', '', '', '', '']; 
  wrongCode:boolean=false;
    constructor(public twilioService : TwilioService,private router: Router, public userServ: UserServicesService, private route: ActivatedRoute){
      this.sendSms();
    }
    ngOnInit():void{
    
    }
    sendSms(){
      this.wrongCode=false;
      this.route.queryParams.subscribe(params =>{
        this.user.password=params['password']||null;
        this.user.phoneNumber=params['phoneNumber']||null;
        this.user.email=params['email']||null;
      })

      console.log("User: ", this.user);
      this.twilioService.sendSMS(this.user.phoneNumber).subscribe(
        (response) => {
          console.log('SMS sent successfully.',this.phoneNumber);
        },
        (error) => {
          console.error('Error sending SMS:', error);
          
        }
      );
    }
    getEnteredCode(): string {
      const code = this.codeDigits.join(''); // Join the digits to form the complete code
      return code;
    } 
    confirm() {
      this.entredCode = this.getEnteredCode();
      //console.log(this.twilioService.getCode());
      if (this.twilioService.verifCode(this.entredCode)) {
        console.log("Correct code");
        //console.log("user", this.user);
        this.userServ.addUser(this.user).subscribe(
          () => {
            console.log("User added successfully");
            this.router.navigate(['/Home']);
          },
          (error) => {
            console.error('Error adding user:', error);
          }
        );
      } else {
        console.log("Wrong code");
        this.wrongCode = true;
        this.codeDigits = ['', '', '', '', '', ''];
      }
    }
    
}
