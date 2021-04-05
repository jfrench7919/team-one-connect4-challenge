import { Injectable } from '@angular/core';

const emptyBoard = [
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
  [0,0,0,0,0,0],
];

@Injectable({
  providedIn: 'root'
})
export class BoardServiceService {

  MainBoard: (1|2|0)[][];

  constructor() { 
    this.MainBoard = JSON.parse(JSON.stringify(emptyBoard));
  }

  initializeBoard(){
    this.MainBoard = JSON.parse(JSON.stringify(emptyBoard));
  }

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

  checkIfWinCondition(consecutiveTokenVicotryCondition = 4): (1|2|0){
    let victor: (1|2|0) = 0;
    victor = this.checkVertWinCondition(this.MainBoard, consecutiveTokenVicotryCondition); 
    if (victor == 0) { victor = this.checkHorizWinCondition(this.MainBoard, consecutiveTokenVicotryCondition); }
    if (victor == 0) { victor = this.checkFDiagWinCondition(this.MainBoard, consecutiveTokenVicotryCondition); }
    if (victor == 0) { victor = this.checkBDiagWinCondition(this.MainBoard, consecutiveTokenVicotryCondition); }

    return victor;
  }

  /** Checks every set of vertical win condition starting points whether or not
   *  there are 4 consecutive equal elements in a column of the game matrix.
   *  Returns 0 otherwise.
   */
  private checkVertWinCondition(matrix: (1|2|0)[][], consecToWin: number): (1|2|0){
    if (consecToWin > matrix[0].length) throw new Error("impossible win condition")

    let highestRowWinCanStart = matrix[0].length - (consecToWin - 1);

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

  /** Check every possible diagonal to see if a consecutive set of
   *  equal elements is long enough to meet the victory conditions.
   *  This checks allong a "forward slash" diagonal
   */
  private checkFDiagWinCondition(matrix: (0|1|2)[][], consecToWin: number): (1|2|0){
    if (consecToWin > matrix.length || consecToWin > matrix[0].length) throw new Error("impossible win condition");
    let maxColStartingPoint = matrix.length - (consecToWin - 1)
    let maxRowStartingPoint = matrix[0].length - (consecToWin - 1)

    for (let column = 0; column < maxColStartingPoint; column++){ 
      for (let ele = 0; ele < maxRowStartingPoint; ele ++){ 
        var cond = this.getfdiag(column,ele,this.MainBoard)
        if (cond && cond.length >= consecToWin){
          if (this.allElesEqual(cond.slice(0,consecToWin)))
          return cond[0];
        }
      }
    }
    return 0;
  }

  /** returns diagonal elements of a matrix as a single dimensional array, starting from a given element,
   *  until the bounds of the matrix is hit.
   *  By default, walk in a "forwardslash" direction, beginning from bottom-left,
   *  to walk in a "backslash" direction, beginning from top-left, input rowStep as -1
   */
  private getfdiag<T>(column: number, ele: number, matrix: T[][], colStep = 1, rowStep = 1): T[]{
    var returnArray = [matrix[column][ele]];
    while (true){
      column = column + colStep;
      ele = ele + rowStep;
      if(
        column >= matrix.length ||
        column < 0 ||
        ele >= matrix[0].length ||
        ele < 0
      ) {break}
      returnArray.push(matrix[column][ele])
    }
    return returnArray;
  }

  private checkBDiagWinCondition(matrix: (0|1|2)[][], consecToWin: number): (1|2|0){
    if (consecToWin > matrix.length || consecToWin > matrix[0].length) throw new Error("impossible win condition");
    let maxColStartingPoint = matrix.length - (consecToWin - 1)
    let minRowStartingPoint = matrix[0].length - 1

    for (let column = 0; column < maxColStartingPoint; column++){
      for (let ele = minRowStartingPoint; ele < matrix[0].length; ele ++){
        var cond = this.getbdiag<(1|2|0)>(column,ele,matrix)
        if (cond && cond.length >= consecToWin){
          if (this.allElesEqual(cond.slice(0,consecToWin)))
          return cond[0];
        }
      }
    }
    return 0;
  }

  private getbdiag<T>(column: number,ele: number, matrix: T[][]): T[]{
    return this.getfdiag(column, ele, matrix, undefined, -1)
  }

  private allElesEqual(array: number[]): boolean{
    return array.every(element => element == array[0]);
  }

}
