import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../../../services/theme/theme.service";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {ToastrService} from "ngx-toastr";
import {Notification} from "./notification";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  keyword: string = '';
  isDarkMode!: boolean;
  socketClient: any = null;
  private notificationSub: any;
  unreadNotificationsCount = 0;
  notifications: Array<Notification> = [];

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private themeService: ThemeService,
    private toastService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.navigationHandler();

    if (this.keycloakService.keycloak.tokenParsed?.sub) {
      let ws = new SockJS('http://localhost:8888/api/v1/ws');
      this.socketClient = Stomp.over(ws);
      this.socketClient.connect({'Authorization': 'Bearer ' + this.keycloakService.keycloak.token}, ()=> {
        this.notificationSub = this.socketClient.subscribe(
          '/user/'+this.keycloakService.keycloak.tokenParsed?.sub+'/notification',
          (message: any) => {
            const notification = JSON.parse(message.body);
            if (notification) {
              this.notifications.unshift(notification);
              switch (notification.status) {
                case 'BORROWED':
                  this.toastService.info(notification.message, notification.bookTitle);
                  break;
                case 'RETURNED':
                  this.toastService.warning(notification.message, notification.bookTitle);
                  break;
                case 'RETURN_APPROVED':
                  this.toastService.success(notification.message, notification.bookTitle);
                  break;
              }
              this.unreadNotificationsCount++;
            }

          }, () => {
            console.error('Error while connecting to webSocket');
          }
        );
      });
    }
  }

  ngOnDestroy() {
    if (this.socketClient !== null) {
      this.socketClient.disconnect();
      this.notificationSub.unsubscribe();
      this.socketClient = null;
    }
  }

  private navigationHandler() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach(link=> {
      if(window.location.href.endsWith(link.getAttribute('href')|| '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', ()=>{
        linkColor.forEach(l=> l.classList.remove('active'));
        link.classList.add('active');
      });
    });
  }

  async logout() {
    await this.keycloakService.logout();
  }

  onSearch() {
    if (this.keyword) {
      this.router.navigate(['/books/search'], {queryParams: {keyword: this.keyword}});
    }
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkModeEnabled();
  }

  get username() {
    // @ts-ignore
    return this.keycloakService.keycloak.tokenParsed?.given_name
  }
}
