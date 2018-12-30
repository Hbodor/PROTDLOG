// this is where the game is set up 


// Creating the grid and the status bar
var grid = new Grid(nRows0, nColumns0);
var s = new status_bar(100, grid);
//showing them inside the page
make_game_zone(s, grid);
k = new King(2, 0);
put(k, grid);