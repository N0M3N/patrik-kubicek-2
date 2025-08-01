import { Component, EventEmitter, Input, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() opened: boolean = false;

  faChevronDown = faChevronDown;

  public order: number = 0;
  _opened: Signal<boolean> = signal(false);
  onToggle = new EventEmitter();

  _onToggle() {
    this.onToggle.emit();
  }
}
