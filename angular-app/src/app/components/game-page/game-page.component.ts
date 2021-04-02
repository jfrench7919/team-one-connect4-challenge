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

  constructor(
    private boardService : BoardServiceService
  ) { }

  ngOnInit(): void {
  
  }

  onColumnClick(colIndex: number){
    var player: (1|2) = 1;
    this.boardService.placeToken(player, colIndex);
    this.boardService.checkIfWinCondition();
  }

}
