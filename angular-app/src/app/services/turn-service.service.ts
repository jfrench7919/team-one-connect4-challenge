import { Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Player } from '../components/playerClass';
// store player info and who's turn is it
@Injectable({
  providedIn: 'root'
})
export class TurnServiceService {

  @Input() playerOneName: Player;
  @Input() playerTwoName: Player;

  turnTracker: number = 0;

  constructor() { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}
