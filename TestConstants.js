// Game Constants are defined here 
//For plants
let Pieces = ['pieces/Pawn.png', 'pieces/Knight.png', 'pieces/Bishop.png',
    'pieces/Rook.png', 'pieces/Queen.png', 'pieces/King.png'];
let Bullets = ['pieces/bullet1.png']
let Names = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King", "FakePlant"];
let Attacks = [1, 2, 3, 4, 5, 2];
let Lives = [1, 3, 4, 4, 5, 5];
let Prices = [10, 20, 30, 40, 50, Infinity];
let MAX_Pieces = [8, 2, 2, 2, 1, 1];
let Moves_L = [[1, 2], [1, -2], [2, 1], [2, -1], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];
let Moves_C = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
//For Zombies
let ZPieces = ['pieces/Zombie1.png', 'pieces/Zombie2.png', 'pieces/Zombie3.png'];
let ZNames = ['Zombie1', 'Zombie2', 'Zombie3'];
let ZAttacks = [1, 3, 5];
let ZLives = [1, 3, 5];
let ZSpeed = [3, 4, 5]; //number of seconds in every step the zombie makes


//Changing the dimensions of the items depending on the initial dimensions of the window

let rowGap=10;
let columnGap=10;
let border=10;
let effectiveBorder=border;
// Border of cells isn't displayed the same way in firefox and chrome
if (typeof InstallTrigger !== 'undefined'){ //firefox
	effectiveBorder=border/2;
}

let nRows0 = 8;
let nColumns0 = 25;
let usableheight = 1080;
let usablewidth = 728;
let size=81.44;

let GridItemSize = "81.44px";
let ButtonHeight = size/2+"px";
let StatusBarHeight = size+"px";
var gridItemColor = 'rgb(28, 82, 4)';
let font_size= 28*size/120;

let movesColor = 'rgb(3, 57, 128)';
let waitingColor = 'rgb(128, 3, 3)';
let onlyOneButtonShouldBeClicked = true;
let pause = false; // to pause the movment of zombies when inserting and moving pieces


let refreshRate=1000/120 // refreshing coordinates in ms



module.exports={GridItemSize,gridItemColor,ZNames,nRows0,nColumns0,border,effectiveBorder,Names,size,ZSpeed,ZLives,ZAttacks,
    ZPieces,Attacks,Bullets,Names,Prices,Lives,Pieces};