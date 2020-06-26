import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../interfaces/interfaces';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
})
export class CardsListComponent {
  @Input() cards: Array<Card>;
  @Output() selectCard = new EventEmitter();
  constructor() {}

  select(card: Card) {
    this.selectCard.emit(card);
  }
}
