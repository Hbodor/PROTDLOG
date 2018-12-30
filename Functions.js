// this file contains all all class separated functions
function make_game_zone(bar, grid) {
    game = document.createElement("div");
    game.className = "game-zone";
    game.appendChild(bar.face);
    game.appendChild(grid.face);
    document.body.appendChild(game);
}

function put(object, grid) {
    // updating the grid's body
    grid.body[object.r][object.c] = object;
    //updating the grid's  face
	grid.face.childNodes[object.r * grid.nColumns + object.c].appendChild(object.face);

    object.face.style.top = grid.face.childNodes[object.r * grid.nColumns + object.c].offsetTop + 'px';
	object.face.style.left = grid.face.childNodes[object.r * grid.nColumns + object.c].offsetLeft + 'px';
	
	grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = clicked(object,grid);
	
}

function erase(object, grid) {
    o = new GameObject(object.r, object.c);
    grid.body[object.r][object.c] = o;
    grid.face.childNodes[object.r * grid.nColumns + object.c].removeChild(
		grid.face.childNodes[object.r * grid.nColumns + object.c].childNodes[0]);
	grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function clear() {clear_grid(G)};
}

function show_moves(object, grid, color)
{
    let L = object.moves(grid);

    for(let i = 0; i<L.length; i++)
    {
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = color;
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick = 
		function move_to()
		{
			clear_grid(grid);
			object.moveto(L[i][0],L[i][1],grid);
		}
	}
}

function hide_moves(object, grid)
{
    show_moves(object, grid, gridItemColor);
}

function clear_grid(G)
{
	for(let r = 0 ; r<G.nRows ; r++)
	{
		for(let c = 0 ; c<G.nColumns ; c++)
		{
			if(G.body[r][c].name == "GameObject")
			{
				G.face.childNodes[r * G.nColumns + c].style.backgroundColor = gridItemColor;
				G.face.childNodes[r * G.nColumns + c].onclick = function clear() {clear_grid(G)};
			}
			else
			{
				G.face.childNodes[r * G.nColumns + c].onclick = clicked(G.body[r][c], G);
			}
		}
	}

}

function clicked(object,grid)
{
	function click1()
	{
		clear_grid(grid);
		show_moves(object, grid, movesColor);
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function click2()
		{
			clear_grid(grid);
			grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = click1;
		}
	}
	return click1;	
}