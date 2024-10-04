import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkThemeClass = 'dark-theme';

  constructor() {}

  toggleTheme(): void {
    document.body.classList.toggle(this.darkThemeClass);
    this.saveThemePreference();
  }

  isDarkModeEnabled(): boolean {
    return document.body.classList.contains(this.darkThemeClass);
  }

  saveThemePreference(): void {
    const theme = this.isDarkModeEnabled() ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add(this.darkThemeClass);
    }
  }
}
