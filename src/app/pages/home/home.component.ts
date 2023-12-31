import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../../components/cards/cards.component';
import { CardComponent } from '../../components/card/card.component';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CardsComponent, CardComponent, LocalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
