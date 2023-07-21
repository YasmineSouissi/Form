import { Injectable } from '@angular/core';

@Injectable()
export class PhoneDataService {
  phoneNumber: string = '';

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }
}
