import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss'
})
export class ActivateAccountComponent {

  message: string ='';
  isOk: boolean = true;
  submitted: boolean = false;

  constructor(
    private router:Router,
    private authService: AuthenticationService) {
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: ()=>{
        this.message = 'Your account has been activated successfully!\nYou can login now'
        this.submitted = true;
        this.isOk = true;
      },
      error: ()=> {
        this.message = 'Token has been expired or invalid'
        this.submitted = true;
        this.isOk = false;
      }
    })
  }

}
