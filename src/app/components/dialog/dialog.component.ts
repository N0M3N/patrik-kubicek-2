import { Component, EventEmitter, HostListener, Input, Output, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input()
  visible!: Signal<boolean>;

  @Output()
  onEnter = new EventEmitter();

  @HostListener('keydown', ['$event'])
  preventEnterSubmit($event: any) {
    if ($event.keyCode === 13) {
      this.onEnter.emit();
      $event.preventDefault();
    }
  }
}
