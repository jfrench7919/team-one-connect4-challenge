import { Injectable } from '@angular/core';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';
import { element } from 'protractor';

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
    for (let i = 0; i < 5; i++)
    {
      if (i != 0){ continue }
      else{
        this.MainBoard[column][i] = player
        return;
      }
    }
    throw new Error("column is full");
  }

  checkIfWinCondition(): (1|2|0){
    let victor: (1|2|0) = 0;
    victor = this.checkVertWinCondition();
    if (victor != 0) { victor = this.checkHorizWinCondition()}
    if (victor != 0) { victor = this.checkFDiagWinCondition()}
    if (victor != 0) { victor = this.checkBDiagWinCondition()}

    return victor;
  }

  checkVertWinCondition(): (1|2|0){
    for (let column = 0; column < 7; column++){
      for (let ele = 0; ele < 3; ele ++){
        if (this.consec(column, ele) == 4){
          return this.MainBoard[column][ele];
        }
      }
    }
    return 0;
  }

  checkHorizWinCondition(): (1|2|0){
    const transposeBoard = this.transpose(this.MainBoard);

    for (let column = 0; column < 6; column++){
      for (let ele = 0; ele < 4; ele ++){
        if (this.consec(column, ele) == 4){
          return transposeBoard[column][ele];
        }
      }
    }
    return 0;
  }

  private consec(column: number, ele: number){
    let consec = 1;
    let continueVar = true;
    do {
      if (this.MainBoard[column][ele+consec]){
        consec++;
        continueVar = true;
      } else {
        continueVar = false;
      }
    } while (continueVar && consec < 4)
    return consec;
  }

  private transpose(matrix: (1|2|0)[][]): (1|2|0)[][]{
    const cols = matrix.length;
    const rows = matrix[0].length;

    let returnMat: (1|2|0)[][] = [

    ]
    for (let i = 1; i <= rows; i++){
      let newColumn: (1|2|0)[] = []
      for (let n = 1 ; n <= cols; n++){
        newColumn.push(matrix[n][i])
      }
      returnMat.push(newColumn);
    }
    return returnMat;
  }

  checkFDiagWinCondition(): (1|2|0){
    for (let column = 0; column < 7; column++){ // 0-6
      for (let ele = 0; ele < 6; ele ++){ // 0-5
        var cond = this.getfdiag(column,ele)
        if (cond && cond.length == 4){
          if (this.allElesEqual(cond))
          return cond[0];
        }
      }
    }
    return 0;
  }

  getfdiag(column: number,ele: number): (1|2|0)[]{
    var returnArray = [this.MainBoard[column][ele]];
    while (returnArray.length != 4){
      column++;ele++;
      if(column > 6 || ele > 5){
        return returnArray
      }
      returnArray.push(this.MainBoard[column][ele])
    }
    return returnArray;
  }

  checkBDiagWinCondition(): (1|2|0){
    for (let column = 0; column < 7; column++){ // 0-6
      for (let ele = 0; ele < 6; ele ++){ // 0-5
        var cond = this.getbdiag(column,ele)
        if (cond && cond.length == 4){
          if (this.allElesEqual(cond))
          return cond[0];
        }
      }
    }
    return 0;
  }

  getbdiag(column: number,ele: number): (1|2|0)[]{
    var returnArray = [this.MainBoard[column][ele]];
    while (returnArray.length != 4){
      column++;ele--;
      if(column > 6 || ele < 0){
        return returnArray
      }
      returnArray.push(this.MainBoard[column][ele])
    }
    return returnArray;
  }

  allElesEqual(array: number[]): boolean{
    return array.every(element => element == array[0]);
  }

}
