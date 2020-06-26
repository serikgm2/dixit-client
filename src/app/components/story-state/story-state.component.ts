import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, GameState, Player } from '../../interfaces/interfaces';

@Component({
  selector: 'app-story-state',
  templateUrl: './story-state.component.html',
  styleUrls: ['./story-state.component.scss'],
})
export class StoryStateComponent {
  private gameState: GameState;
  @Input()
  set game(game: GameState) {
    this.gameState = game || null;
  }
  get game(): GameState {
    return this.gameState;
  }
  @Input() player: Player;
  @Output() guessStoryCard = new EventEmitter();

  public voteForStoryBtnTitle =
    'Select card you think belonged to Story Teller and click me :)';

  constructor() {}

  selectCard(card: Card) {
    this.gameState = {
      ...this.gameState,
      storyState: {
        ...this.gameState.storyState,
        playedCards: this.gameState.storyState.playedCards.map((c) => ({
          ...c,
          selected: c.src === card.src,
        })),
      },
    };
  }

  get isCardSelected() {
    return (
      this.gameState &&
      this.gameState.storyState &&
      this.gameState.storyState.playedCards.filter((card) => card.selected)
        .length
    );
  }

  guessStory() {
    this.guessStoryCard.emit({
      selectedCard: this.gameState.storyState.playedCards.filter(
        (card) => card.selected
      )[0],
    });
  }
}
