import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faAt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  faPhone = faPhone;
  faWhatsapp = faWhatsapp;
  faAt = faAt;
  faLinkedin = faLinkedin;
  faMoon = faMoon;
  faSun = faSun;
  currentTheme: 'light' | 'dark';
  body: HTMLBodyElement;

  constructor() {
    this.body = document.querySelector('body')!;
    this.currentTheme = localStorage.getItem('theme') as 'light' | 'dark' ?? 'light';
    this.setTheme(this.currentTheme);
  }

  changeTheme() {
    this.setTheme(this.body.classList.contains('light') ? 'dark' : 'light');
  }

  setTheme(theme: 'light' | 'dark') {
    switch (theme) {
      case 'light':
        this.body.classList.replace('dark', 'light');
        break;
      case 'dark':
        this.body.classList.replace('light', 'dark');
        break;
      default:
        throw Error(`Theme ${theme} does not exist`);
    }
    this.currentTheme = theme;
    localStorage.setItem('theme', theme);
  }
}
