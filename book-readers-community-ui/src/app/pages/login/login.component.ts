import { Component } from '@angular/core';
import {AuthenticationRequest} from "../../services/models/authentication-request";
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {email:'', password:''};
  errorMessage: Array<string> = [];

  constructor(
    private router:Router,
    private authService: AuthenticationService,

  ) {

  }

  login() {
    this.errorMessage = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res)=> {

        this.router.navigate(['books']);
      },
      error: (err)=> {
        console.log(err)
        if(err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors
        } else {
          this.errorMessage.push(err.error.error)
        }
      }
    })
  }

  register() {
    this.router.navigate(['register']);
  }
}
