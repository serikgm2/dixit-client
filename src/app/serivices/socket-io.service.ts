import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GameState, Player } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SocketIoService {
  socket: any;
  gameState: Observable<GameState>;
  playerState: Observable<Player>;
  uuid: string;

  constructor() {}

  setupSocketConnection(): void {
    this.socket = io(environment.socketIoUrl);
    this.gameState = this.listenEvent('gameState') as Observable<GameState>;
    this.playerState = this.listenEvent('playerState') as Observable<Player>;
    this.playerState.subscribe((playerState) => {
      this.uuid = playerState && playerState.uuid;
    });
  }

  joinGame(formValue) {
    this.emit('joinGame', { ...formValue });
    this.playerState.pipe(tap((data) => console.log(data, 'data')));
  }

  resetGame() {
    this.emit('resetGame');
  }

  startGame() {
    this.emit('startGame', this.uuid);
  }

  startStory(selectedCard) {
    this.emit('startStory', { uuid: this.uuid, selectedCard });
  }

  playStory(selectedCard) {
    this.emit('playStory', { uuid: this.uuid, selectedCard });
  }

  guessStoryCard(selectedCard) {
    this.emit('guessStoryCard', { uuid: this.uuid, selectedCard });
  }

  private listenEvent(eventName: string): Observable<unknown> {
    return new Observable<unknown>((subscriber) =>
      this.socket.on(eventName, (data) => subscriber.next(data))
    );
  }

  private emit(eventName: string, data?: unknown) {
    data ? this.socket.emit(eventName, data) : this.socket.emit(eventName);
  }
}
