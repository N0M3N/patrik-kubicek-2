import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FaIconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent<T> {
  @Input()
  type!: string;

  @Input()
  label?: string | null;

  @Input()
  value?: T;

  @Input()
  icon?: IconDefinition;

  @Output()
  valueChange = new EventEmitter<T>();

  hasValue = signal(false);

  ngOnChanges() {
    this.hasValue.set(!!this.value);
  }

  onChange($event: any) {
    this.value = $event.target.value;
    this.valueChange.emit(this.value);
    this.hasValue.set(!!this.value);
  }
}
