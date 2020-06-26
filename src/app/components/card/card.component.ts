import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() card: any;
  @Output() selectCard = new EventEmitter();

  constructor() {}

  select(card) {
    this.selectCard.emit(card);
  }
}
