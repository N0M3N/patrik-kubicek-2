import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../components/cards/cards.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, CardsComponent, CardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
