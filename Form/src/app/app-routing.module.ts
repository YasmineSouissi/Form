import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WelcomePaneComponent } from './welcome-pane/welcome-pane.component';
  
const routes: Routes = [
  { path: "", component:WelcomePaneComponent},
  { path: "signIn", component:SignInComponent},
  { path: "signUp", component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
