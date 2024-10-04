import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../../../services/theme/theme.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{

  keyword: string = '';

  isDarkMode!: boolean;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
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

}
