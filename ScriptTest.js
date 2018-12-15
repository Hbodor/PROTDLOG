// all the test should be in this file 
let p = new Pawn(5,5);
let b = new Queen(3,3);
put(p, grid);
put(b, grid);
console.log(p.moves(grid));
console.log(b.moves(grid));
