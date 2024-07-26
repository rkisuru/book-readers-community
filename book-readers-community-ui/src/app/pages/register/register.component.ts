import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private router:Router,
    private authService:AuthenticationService
  ) {

  }

  registrationRequest: RegistrationRequest = {email:'', firstName:'', lastName:'',
    password:''
  }

  errorMessage: Array<string> = [];

  register() {
    this.errorMessage = [];
    this.authService.register({
      body: this.registrationRequest
    }).subscribe({
      next: ()=> {
        this.router.navigate(['activate-account']);
      },
      error: (err)=> {
        this.errorMessage = err.error.validationErrors;
      }
    })
  }

  login() {
    this.router.navigate(['login']);
  }

}
