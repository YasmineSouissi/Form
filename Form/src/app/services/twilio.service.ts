
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TwilioService {
  private apiUrl = 'http://localhost:4000/send-sms';
  private code: string =this.generateVerificationCode();

  constructor(private http: HttpClient) {}

  generateVerificationCode(): string {
    const codeLength = 4;
    const characters = '0123456789'; // Caractères autorisés pour le code
  
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
  
    return code;
  }

  sendSMS(phoneNumber: string) {
    let message='your verification code is : '+this.code;
    const payload = { phoneNumber, message };
    return this.http.post<any>(this.apiUrl, payload);
  }

  verifCode(c:string){
    return this.code===c;
  }
  getCode(){
    return this.code;
  }
}
