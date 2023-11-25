import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expander',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.scss'
})
export class ExpanderComponent {
  @Input()
  open: boolean = true;

  faChevronLeft = faChevronLeft;

}
