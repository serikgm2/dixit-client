import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Card, GameState, Player } from '../../interfaces/interfaces';

@Component({
  selector: 'app-player-state',
  templateUrl: './player-state.component.html',
  styleUrls: ['./player-state.component.scss'],
})
export class PlayerStateComponent {
  private playerState: Player;
  @Input()
  set player(player: Player) {
    this.playerState = player || null;
  }
  get player(): Player {
    return this.playerState;
  }
  @Input() gameState: GameState;
  @Output() startStory = new EventEmitter();
  @Output() playStory = new EventEmitter();

  public tellStoryBtnTitle =
    'Select the card regarding to Your story and click me :)';
  public playStoryBtnTitle =
    'Select the card regarding to provided story and click me :)';

  constructor() {}

  selectCard(card: Card) {
    this.playerState = {
      ...this.playerState,
      myCards: this.playerState.myCards.map((c) => ({
        ...c,
        selected: c.src === card.src,
      })),
    };
  }

  get isCardSelected() {
    return (
      this.playerState &&
      this.playerState.myCards &&
      this.playerState.myCards.filter((card) => card.selected).length
    );
  }

  get playStoryEnabled() {
    return (
      this.gameState.storyGiven &&
      this.isCardSelected &&
      !this.playerState.storyTeller &&
      this.gameState.players.filter(
        (player) => player.uuid === this.playerState.uuid
      )[0].actionRequired
    );
  }

  tellStory() {
    this.startStory.emit({
      uuid: this.playerState.uuid,
      selectedCard: this.playerState.myCards.filter((c) => c.selected)[0],
    });
  }

  answerStory() {
    this.playStory.emit({
      selectedCard: this.playerState.myCards.filter((c) => c.selected)[0],
    });
  }
}
