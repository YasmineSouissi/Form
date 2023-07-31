import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePaneComponent } from './welcome-pane/welcome-pane.component';
import { HomeComponent } from './home/home.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { OTPVerificationComponent } from './otp-verification/otp-verification.component';
  
const routes: Routes = [
  { path: "", component:WelcomePaneComponent},
  { path: "signIn", component:SignInComponent},
  { path: "signUp", component:SignUpComponent},
  { path: "Home",component:HomeComponent},
  { path: "OTP-Verification", component:OTPVerificationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
