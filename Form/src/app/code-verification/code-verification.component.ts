import { Component } from '@angular/core';
import { User } from '../Model/user';
import { TwilioService } from '../services/twilio.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent {
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


