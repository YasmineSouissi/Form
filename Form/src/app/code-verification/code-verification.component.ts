import { Component } from '@angular/core';
import { User } from '../Model/user';


@Component({
  selector: 'app-code-verification',
  templateUrl: './code-verification.component.html',
  styleUrls: ['./code-verification.component.css']
})
export class CodeVerificationComponent {
    user : User= new User(); 
  }


