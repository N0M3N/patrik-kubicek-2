import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent<T> {
  @Input()
  type!: string;

  @Input()
  label!: string;

  @Input()
  value?: T;

  @Output()
  valueChange = new EventEmitter<T>();

  hasValue = signal(false);

  onChange($event: any) {
    this.value = $event.target.value;
    this.valueChange.emit(this.value);
    this.hasValue.set(!!this.value);
  }
}
