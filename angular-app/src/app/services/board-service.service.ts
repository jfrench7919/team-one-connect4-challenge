import { Injectable } from '@angular/core';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  constructor() { }

  MainBoard: (1|2|0)[][] = 
    [
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
      [0,0,0,0,0,0],
    ];

  placeToken(player:(1|2), column: number): void{
    return
  }

  checkIfWinCondition(): (1|2|0){
    return 0;
  }

}
