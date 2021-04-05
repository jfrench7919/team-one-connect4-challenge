import { Injectable } from '@angular/core';

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
      if (this.MainBoard[column][i] != 0){ continue }
      else{
        this.MainBoard[column][i] = player
        return;
      }
    }
    throw new Error("column is full");
  }

  checkIfWinCondition(): (1|2|0){
    let victor: (1|2|0) = 0;
    victor = this.checkVertWinCondition(this.MainBoard, 4); if (victor) console.log("VERT")
    if (victor == 0) { victor = this.checkHorizWinCondition(this.MainBoard, 4); if (victor) console.log("HORIZ")}
    if (victor == 0) { victor = this.checkFDiagWinCondition(); if (victor) console.log("FDIAG")}
    if (victor == 0) { victor = this.checkBDiagWinCondition(); if (victor) console.log("BDIAG")}
    console.log('======================================')

    return victor;
  }

  /** Checks every set of vertical win condition starting points whether or not
   *  there are 4 consecutive equal elements in a column of the game matrix.
   *  Returns 0 otherwise.
   */
  private checkVertWinCondition(matrix: (1|2|0)[][], consecToWin: number): (1|2|0){
    if (consecToWin > matrix[0].length) throw new Error("impossible win condition")

    let highestRowWinCanStart = matrix[0].length - consecToWin - 1;

    for (let column = 0; column < matrix.length; column++){   // for every column
      for (let ele = 0; ele < highestRowWinCanStart; ele ++){ // for every element that can be a possible win condition starting point
        if (matrix[column][ele] && this.consec(column, ele, matrix) == consecToWin){
          return matrix[column][ele];
        }
      }
    }
    return 0;
  }

  /** Checks every set of horizontal win condition starting points whether or not
   *  there are 4 consecutive equal elements in a row of the game matrix.
   *  This is done by transposing the matrix, and performing the same vertical
   *  check as is done in the vertical win condition function.
   */
  private checkHorizWinCondition(matrix: (1|2|0)[][], consecToWin: number): (1|2|0){
    const transposeBoard = this.transpose<(1|2|0)>(matrix);
    return this.checkVertWinCondition(transposeBoard, consecToWin);
  }

  /** Determines the number of consecutive matching column entries are above a given element */
  private consec(column: number, ele: number, matrixRef: (1|2|0)[][]){
    let consec = 1;
    while (ele + consec < matrixRef[0].length){
      if (matrixRef[column][ele + consec] != matrixRef[column][ele]){
        break;
      }
      consec++
    }
    return consec;
  }

  /** Perform a matrix transposition operation in infed Matrix */
  private transpose<T>(matrix: T[][]): T[][]{
    const cols = matrix.length;
    const rows = matrix[0].length;

    let returnMat: T[][] = []

    for (let i = 0; i < rows; i++){
      let newColumn: T[] = []
      for (let n = 0 ; n < cols; n++){
        newColumn.push(matrix[n][i])
      }
      returnMat.push(newColumn);
    }
    return returnMat;
  }

  private checkFDiagWinCondition(): (1|2|0){
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

  private getfdiag(column: number,ele: number): (1|2|0)[]{
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

  private checkBDiagWinCondition(): (1|2|0){
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

  private getbdiag(column: number,ele: number): (1|2|0)[]{
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

  private allElesEqual(array: number[]): boolean{
    return array.every(element => element == array[0]);
  }

}
