import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ActivationStart, NavigationEnd, NavigationStart, Router, RouterModule, RouterOutlet, RoutesRecognized } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faAt, faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Language, LocalizationService } from './services/localization.service';
import { LocalizePipe } from './pipes/localize.pipe';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule, RouterOutlet, LocalizePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  private localizationService = inject(LocalizationService);
  language$ = this.localizationService.language;
  appMode$: Observable<boolean>;

  faBars = faBars;
  faPhone = faPhone;
  faWhatsapp = faWhatsapp;
  faAt = faAt;
  faLinkedin = faLinkedin;
  faMoon = faMoon;
  faSun = faSun;
  faGithub = faGithub;
  currentTheme: 'light' | 'dark';
  body: HTMLBodyElement;

  constructor() {
    this.body = document.querySelector('body')!;
    this.currentTheme = localStorage.getItem('theme') as 'light' | 'dark' ?? 'light';
    this.setTheme(this.currentTheme);
    this.appMode$ = this.router.events.pipe(
      filter(d => d instanceof ActivationStart), 
      map(d => d as ActivationStart), 
      map(d => d.snapshot.data['appMode'] ?? false));
  }

  changeLanguage(language: Language) {
    this.localizationService.changeLanguage(language);
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
