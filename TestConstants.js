// Game Constants are defined here 
//For plants
let Pieces = ['pieces/Pawn.png', 'pieces/Knight.png', 'pieces/Bishop.png',
    'pieces/Rook.png', 'pieces/Queen.png', 'pieces/King.png'];
let Names = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King"];
let Attacks = [2, 2, 3, 4, 4, 2]; // attack frequency
let Lives = [2, 3, 4, 4, 5, 5];
let Prices = [10, 20, 30, 40, 50, Infinity];
let MAX_Pieces = [8, 2, 2, 2, 1, 1];
let Moves_L = [[1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];
let Moves_C = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
let sellingFactor = 0.5
//For Zombies
let ZPieces = ['pieces/Zombie1.png', 'pieces/Zombie2.png', 'pieces/Zombie3.png'];
let ZNames = ['Zombie1', 'Zombie2', 'Zombie3'];
let ZAttacks = [2, 3, 5];
let ZRewards = [10,20,30];
let ZLives = [3, 5, 7];
let ZSpeed = [3, 5, 7]; //number of seconds in every step the zombie makes

let rowGap = 10;
let columnGap = 10;
let nRows0 = 5;
let nColumns0 = 12;

let size = 50;
let GridItemSize = size + "px";
let ButtonHeight = size / 2 + "px";
let StatusBarHeight = size + "px";
let gridItemColor = 'rgb(28, 82, 4)';
let movesColor = 'rgb(3, 57, 128)';
let waitingColor = 'rgb(128, 3, 3)';
let font_size = 28 * size / 120;
let onlyOneButtonShouldBeClicked = true;
let pause = false; // to pause the movment of zombies when inserting and moving pieces
let GameLevel = 1;
let ButtonHaveEffect = false;
let GameIsPaused = false; // indicates whether the game is paused or not
let GameStarted = false; // indicates whether the game started or not 



module.exports = {
    GridItemSize, gridItemColor, ZNames, nRows0, nColumns0, Names, size, ZSpeed, ZLives, ZAttacks,
    ZPieces, Attacks, Names, Prices, Lives, Pieces, movesColor,ZRewards,GameIsPaused,
    StatusBarHeight,ButtonHeight,font_size,Prices,sellingFactor,pause,ButtonHaveEffect
};