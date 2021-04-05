import { TurnServiceService } from './../../services/turn-service.service';
import { Component, OnInit } from '@angular/core';
import { BoardServiceService } from 'src/app/services/board-service.service';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  testPlayer = "Player 1"
  win = false;

  constructor(
    public boardService : BoardServiceService,
    public turnService : TurnServiceService
  ) { }

  ngOnInit(): void {

  }

  onColumnClick(colIndex: number){


    var player: (1|2) = this.turnService.UpdateTurn();
    if(player === this.turnService.CurrentPlayer())
    {
      this.boardService.placeToken(player, colIndex);
    }

    if(this.boardService.checkIfWinCondition()){
      this.win = true;

    }
  }

}
