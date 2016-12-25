namespace Board {

  const directions: IDirection[] = [
    { horizontal: -2, vertical: 1 }, { horizontal: -2, vertical: -1 },
    { horizontal: -1, vertical: 2 }, { horizontal: -1, vertical: -2 },
    { horizontal: 1, vertical: 2 }, { horizontal: 1, vertical: -2 },
    { horizontal: 2, vertical: 1 }, { horizontal: 2, vertical: -1 }
  ];

  /**
   * A class containing the available functions for a square
   */
  export class Square implements ISquare {

    /**
     * The horizontal position of the square
     */
    readonly horizontal: number;

    /**
     * The vertical position of the square
     */
    readonly vertical: number;

    constructor(horizontal: number, vertical: number) {
      this.horizontal = horizontal;
      this.vertical = vertical;
    }

    /**
     * Retrieve an array of the potential squares that could be reached from the current square
     */
    getMoves(): Square[] {
      "use strict";

      return directions
        .filter(({ horizontal, vertical }): boolean => {
          return Square.isValid(horizontal + this.horizontal, vertical + this.vertical);
        })
        .map(({ horizontal, vertical }): Square => {
          return new Square(horizontal + this.horizontal, vertical + this.vertical);
        });
    }

    /**
     * Retrieve the value of the current square
     */
    getValue(): number {
      "use strict";

      return this.getMoves().length;
    }

    /**
     * Return the user friendly position identifier for the current square
     */
    get coordinates() {
      "use strict";

      return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][this.horizontal - 1] + this.vertical;
    }

    /**
     * Determine whether or not a square is within the bounds of the board
     */
    static isValid(horizontal: number, vertical: number): boolean {
      "use strict";

      return Math.min(horizontal, vertical) > 0 && Math.max(horizontal, vertical) <= 8;
    }

  }

  interface IDirection {
    readonly horizontal: -2 | -1 | 1 | 2;
    readonly vertical: -2 | -1 | 1 | 2;
  }

  interface ISquare {
    readonly horizontal: number;
    readonly vertical: number;
    readonly coordinates: string;

    getMoves(): ISquare[];
    getValue(): number;
  }

}

function getAvailableMoves(position: Board.Square, history: string[]): Board.Square[] {
  "use strict";

  return position.getMoves()
    .filter((move: Board.Square): boolean => {
      return !history.includes(move.coordinates);
    });
}

function getNextMove(position: Board.Square, history: string[]): Board.Square {
  "use strict";

  return getAvailableMoves(position, history)
    .reduce((prev: Board.Square, curr: Board.Square): Board.Square => {
      let prevValue = prev.getValue();
      let currValue = curr.getValue();

      if (prevValue === currValue) {
        return Math.random() < 0.5 ? prev : curr;
      } else {
        return prevValue < currValue ? prev : curr;
      }
    });
}

(function bruteForce(): void {
  "use strict";

  let position: Board.Square = new Board.Square(1, 1);
  let history: string[] = [position.coordinates];

  while (getAvailableMoves(position, history).length > 0) {
    const move = getNextMove(position, history);

    if (move) {
      history.push(move.coordinates);
      position = move;
    } else {
      break;
    }
  }

  if (history.length === 64) {
    console.log(history);
  } else {
    void setTimeout(bruteForce);
  }

})();
