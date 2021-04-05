import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Player } from '../components/playerClass';

// store player info and who's turn is it
@Injectable({
  providedIn: 'root'
})
export class TurnServiceService {

  Player1Name = ''
  Player2Name = ''

  turnTracker: number = 0;

  constructor() { }

  // Starts the game with a random first player;
  initializeGame() : (1|2) {
    return this.turnTracker = Math.random() > .5 ? 2 : 1;
  }

  getCurrentPlayerName(): string {
    if (this.turnTracker == 1) return this.Player1Name;
    return this.Player2Name;
  }

  UpdateTurn(): (1 | 2) {
    if(this.turnTracker === 1)
    {
      return this.turnTracker = 2;
    }
    else if(this.turnTracker === 2)
    {
      return this.turnTracker = 1;
    }
    else {
      return this.turnTracker = 1;
    }
  }

  CurrentPlayer(): number {
    return this.turnTracker;
  }

}
