import { Component, EventEmitter, HostListener, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  public order: number = 0;
  opened: Signal<boolean> = signal(false);
  onToggle = new EventEmitter();
  
  _onToggle() {
    this.onToggle.emit();
  }
}
