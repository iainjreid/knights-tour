class Knight {
  position: Board.Square;
  history: Board.Square[];

  constructor() {
    this.moveTo(Board.squares[0]);
  }

  moveTo(position: Board.Square): void {
    this.position = position;
  }
}

namespace Board {
  const size: number = 8;
  const squares: Square[] = [];

  const directions: Array<{ horizontal: number, vertical: number }> = [
    { horizontal: -2, vertical: 1 }, { horizontal: -2, vertical: -1 },
    { horizontal: -1, vertical: 2 }, { horizontal: -1, vertical: -2 },
    { horizontal: 1, vertical: 2 }, { horizontal: 1, vertical: -2 },
    { horizontal: 2, vertical: 1 }, { horizontal: 2, vertical: -1 }
  ];

  export class Square implements squareInterface {
    horizontal: number;
    vertical: number;

    constructor(horizontal: number, vertical: number) {
      this.horizontal = horizontal;
      this.vertical = vertical;
    }

    getMoves(): Square[] {
      const moves = [];

      for (let { horizontal, vertical } of directions) {
        if (Square.isValid(horizontal + this.horizontal, vertical + this.vertical)) {
          moves.push(boardPositions[Square.parseCoordinates(horizontal + this.horizontal, vertical + this.vertical)]);
        }
      }

      return moves;
    }

    static isValid(horizontal: number, vertical: number): boolean {
      return Math.min(horizontal, vertical) > 0 && Math.max(horizontal, vertical) <= size;
    }

    static parseCoordinates(horizontal, vertical) {
      return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][horizontal - 1] + vertical;
    }
  }

  export interface squareInterface {
    horizontal: number;
    vertical: number;
  }
}

(function bruteForce() {
  const knight = new Knight()
})()