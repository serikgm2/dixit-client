export interface GameState {
  allCards: Array<Card>;
  playedCards: Array<Card>;
  selectedCards: Array<Card>;
  players: Array<Player>;
  currentPlayer: Player;
  storyState: {
    storyCard: Card;
    playedCards: Array<Card>;
  };
  storyGiven: boolean;
  started: boolean;
}

export interface Player {
  uuid: string;
  name: string;
  color: string;
  score: number;
  myCards?: Array<Card>;
  storyTeller?: boolean;
  actionRequired?: boolean;
  playedStory?: boolean;
  guessed?: boolean;
}

export interface Card {
  src: string;
  selected: boolean;
}
