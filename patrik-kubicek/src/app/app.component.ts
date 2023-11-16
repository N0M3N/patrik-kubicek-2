import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  body: HTMLBodyElement;

  constructor() {
    this.body = document.querySelector('body')!;
    const theme = localStorage.getItem('theme') as 'light' | 'dark';
    if (theme != null)
      this.setTheme(theme);
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
    localStorage.setItem('theme', theme);
  }
}
