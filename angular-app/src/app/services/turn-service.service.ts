import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Player } from '../components/playerClass';
// store player info and who's turn is it
@Injectable({
  providedIn: 'root'
})
export class TurnServiceService {

  turnTracker: number = 0;


  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

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
