// Game Constants are defined here 
let Pieces = ['pieces/Pawn.png', 'pieces/Knight.png','pieces/Bishop.png',
 'pieces/Rook.png', 'pieces/King.png','pieces/Queen.png' ]
let Names = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"]
let Attacks = [1, 2, 3, 4, 5, 2];
let Lives = [1, 3, 4, 4, 5, 5];
let Prices = [10, 20, 30, 40, 50, Infinity];
let MAX_Pieces = [8, 2, 2, 2, 1, 1];
let Moves_L = [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2], [-2,1], [-2,-1]]
let Moves_C = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];


//Hamza a toi de jouer avec les parametres..
let nRows0 = 8;
let nColumns0 = 8;
let GridItemSize = '80px';
let ButtonHeight = '40px';
//....
