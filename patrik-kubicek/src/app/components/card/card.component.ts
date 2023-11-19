import { Component, EventEmitter, HostListener, Input, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() opened: boolean = false;

  public order: number = 0;
  _opened: Signal<boolean> = signal(false);
  onToggle = new EventEmitter();
  
  _onToggle() {
    this.onToggle.emit();
  }
}
