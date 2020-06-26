import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { PlayerComponent } from './components/player/player.component';
import { SocketIoService } from './serivices/socket-io.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PlayerStateComponent } from './components/player-state/player-state.component';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { StoryStateComponent } from './components/story-state/story-state.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayerComponent,
    PlayerStateComponent,
    CardsListComponent,
    StoryStateComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, TooltipModule.forRoot()],
  providers: [SocketIoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
