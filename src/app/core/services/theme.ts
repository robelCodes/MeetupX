import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private readonly themeKey = 'theme';
  
  isDarkMode =  signal(localStorage.getItem(this.themeKey) === 'dark');

  constructor() {
    this.applyTheme();
  }

  toggleTheme(){
    this.isDarkMode.update(v=>!v);
    this.applyTheme();
  }

  private applyTheme() {
  document.documentElement.setAttribute('data-theme', this.isDarkMode() ? 'dark' : 'light');
  localStorage.setItem(this.themeKey, this.isDarkMode() ? 'dark' : 'light');
}
}
