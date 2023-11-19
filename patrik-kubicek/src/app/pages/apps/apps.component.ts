import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../components/cards/cards.component';
import { CardComponent } from '../../components/card/card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [CommonModule, CardsComponent, CardComponent, FaIconComponent],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {
  faGift = faGift;
}
