// all the test should be in this file 

var grid=new Grid(nRows0,nColumns0);

var s = new status_bar(100,100);
make_game_zone(s,grid);

let p = new Pawn(5,5);
let b = new Bishop(0,0);
put(p, grid);
put(b, grid);
console.log(p.moves(grid));
console.log(b.moves(grid));
