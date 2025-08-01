import { Component, ContentChildren, QueryList, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @ContentChildren(CardComponent) cards!: QueryList<CardComponent>;
  private readonly signal = signal<number | null>(null)

  ngAfterContentInit() {
    this.cards.forEach((card, i) => {
      card.order = i;
      card._opened = computed(() => this.signal() === i);
      card.onToggle.subscribe(() => this.signal.set(this.signal() === i ? null : i));
    })

    this.cards.find(x => x.opened)?.onToggle.emit();
  }
}
