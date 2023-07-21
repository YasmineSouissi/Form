// twilio.service.ts
import { Injectable } from '@angular/core';
import * as twilio from 'twilio';


@Injectable({
  providedIn: 'root',
})
export class TwilioService {

  private accountSid = 'ACa5a533337f4deb14299ba37e3fa27bfc'; // Remplacez par votre Account SID
  private authToken = '471f984470f161c034122ccc2c0e4725'; // Remplacez par votre Auth Token
  private twilioClient: twilio.Twilio;

  constructor() {
    this.twilioClient = twilio(this.accountSid, this.authToken);
  }

  sendVerificationCode(phoneNumber: string): Promise<any> {
    const verificationCode = this.generateRandomCode();

    return this.twilioClient.messages.create({
      body: `Votre code de vérification est : ${verificationCode}`,
      from: '+14323563233', // Remplacez par votre numéro Twilio
      to: phoneNumber,
    });
  }

  private generateRandomCode(): string {
    // Générez un code de vérification aléatoire (par exemple, à 6 chiffres)
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
