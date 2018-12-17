// Game Constants are defined here 
let Pieces = ['pieces/Pawn.png', 'pieces/Knight.png','pieces/Bishop.png',
 'pieces/Rook.png','pieces/Queen.png', 'pieces/King.png' ]
let Names = ["Pawn", "Knight", "Bishop", "Rook", "Queen", "King","FakePlant"]
let Attacks = [1, 2, 3, 4, 5, 2];
let Lives = [1, 3, 4, 4, 5, 5];
let Prices = [10, 20, 30, 40, 50, Infinity];
let MAX_Pieces = [8, 2, 2, 2, 1, 1];
let Moves_L = [[1,2], [1,-2], [2,1], [2,-1], [-1,2], [-1,-2], [-2,1], [-2,-1]]
let Moves_C = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
let action=1;
let type=0;



//Changing the dimensions of the items depending on the initial dimensions of the window

let rowGap=10;
let columnGap=10;

let nRows0 = 8;
let nColumns0 = 8;
let usableheight = window.innerHeight-document.getElementById("start").offsetTop-(nRows0+6)*rowGap;
let usablewidth = window.innerWidth-document.getElementById("start").offsetLeft-(nColumns0+1)*columnGap;
let size=Math.min(usablewidth/nColumns0,usableheight/(nRows0+1.5));

let GridItemSize = size+"px";
let ButtonHeight = size/2+"px";
let StatusBarHeight = size+"px";
let gridItemColor = 'rgb(28, 82, 4)';
let font_size= 28*size/120;
