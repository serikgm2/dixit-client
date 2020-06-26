import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketIoService } from './serivices/socket-io.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { GameState, Player } from './interfaces/interfaces';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  // public player$: Observable<Player>;
  // public game$: Observable<GameState>;
  public player: Player;
  public game: GameState;
  private unsubscribe$ = new Subject<void>();
  playerForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  public joinBtnTitle = 'Please enter your name and click me :)';
  public startGameBtnTitle =
    'Click me to start a game when all participants are joined :)';
  public resetGameBtnTitle = 'Click me to start from scratch :)';

  constructor(private socketService: SocketIoService) {}

  ngOnInit(): void {
    this.socketService.setupSocketConnection();
    // this.game$ = this.socketService.gameState;
    // this.player$ = this.socketService.playerState;
    this.socketService.gameState
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((gameState) => {
        this.game = gameState;
      });
    this.socketService.playerState
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((playerState) => {
        this.player = playerState;
      });
  }

  public joinGame() {
    this.socketService.joinGame(this.playerForm.value);
  }

  public resetGame() {
    this.socketService.resetGame();
  }

  public startGame() {
    this.socketService.startGame();
  }

  public startStory({ selectedCard }) {
    this.socketService.startStory(selectedCard);
  }

  public playStory({ selectedCard }) {
    this.socketService.playStory(selectedCard);
  }

  public guessStoryCard({ selectedCard }) {
    this.socketService.guessStoryCard(selectedCard);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
