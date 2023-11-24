import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './gifts.component.html',
  styleUrl: './gifts.component.scss'
})
export class GiftsComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  addDialogVisible = signal(false);
  
  faChevronLeft = faChevronLeft;
  faPlus = faPlus;

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
