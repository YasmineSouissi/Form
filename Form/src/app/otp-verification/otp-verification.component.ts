import { Component } from '@angular/core';
import { TwilioService } from '../services/twilio.service';
import { User } from '../Model/user';
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OTPVerificationComponent {

  user : User= new User(); 
    entredCode: string='';
    codeDigits: string[] = ['', '', '', '', '', '']; 
    constructor(public twilioService : TwilioService){}
    getEnteredCode(): string {
      const code = this.codeDigits.join(''); // Join the digits to form the complete code
      return code;
    }
    
    
    confirm(){
      this.entredCode=this.getEnteredCode();
      console.log(this.twilioService.getCode());
      if (this.twilioService.verifCode(this.entredCode)){
        console.log("Correct code");
      }
      else{
        console.log("Wrong code");
      }

    }
}
