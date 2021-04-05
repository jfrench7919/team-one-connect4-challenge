import { TurnServiceService } from './../../services/turn-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardServiceService } from 'src/app/services/board-service.service';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  @Output() reset = new EventEmitter();

  currentPlayer: (1|2) = 1;
  currentPlayerName = '';

  win = false;

  constructor(
    public boardService : BoardServiceService,
    public turnService : TurnServiceService
  ) { }

  ngOnInit(): void {
    this.boardService.initializeBoard();
    this.currentPlayer = this.turnService.initializeGame();
    this.currentPlayerName = this.turnService.getCurrentPlayerName();
  }

  onColumnClick(colIndex: number){
    if(this.win){return}

    this.boardService.placeToken(this.currentPlayer, colIndex);

    if(this.boardService.checkIfWinCondition()){
      this.win = true;
      return
    }

    this.currentPlayer = this.turnService.UpdateTurn()
    this.currentPlayerName = this.turnService.getCurrentPlayerName()
  }

  resetGame(): void {
    this.reset.emit();
  }

}
