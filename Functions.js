//To test This file we uncomment the following block, otherwwise, it should be strictly commented


var {GridItemSize,gridItemColor,size,ZNames,border,effectiveBorder,Names,movesColor} = require ("./TestConstants");
var {GameObject} = require ("./GameObjects.js");

////////////////////////////////////////////////////////////////////////////////////////////////





// this file contains all all class separated functions
function make_game_zone(bar, grid) {
	game = document.createElement("div");
	game.className = "game-zone";
	game.appendChild(bar.face);
	game.appendChild(grid.face);
	document.body.appendChild(game);
}

put = (object, grid) => {
	// updating the grid's body
	grid.body[object.r][object.c] = object;
	//updating the grid's  face
	grid.face.childNodes[object.r * grid.nColumns + object.c].appendChild(object.face);
	
	object.x=grid.face.childNodes[object.r * grid.nColumns + object.c].offsetLeft+effectiveBorder;
	object.y=grid.face.childNodes[object.r * grid.nColumns + object.c].offsetTop+effectiveBorder;

	object.face.style.top = object.y + 'px';
	object.face.style.left = object.x + 'px';

	if (Names.includes(object.name)) {
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = clicked(object, grid);
	}
}

function erase(object, grid) {
	o = new GameObject(object.r, object.c);
	grid.body[object.r][object.c] = o;
	grid.face.childNodes[object.r * grid.nColumns + object.c].removeChild(object.face);
	grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function clear() { clear_grid(grid) };
}

function show_moves(object, grid, color) {
	let L = object.moves(grid);

	for (let i = 0; i < L.length; i++) {
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = color;
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick =
			function move_to() {
				clear_grid(grid);
				object.moveto(L[i][0], L[i][1], grid);
			}
	}
}

function clear_grid(G) {

	for (let r = 0; r < G.nRows; r++) {
		for (let c = 0; c < G.nColumns; c++) {
			if (G.body[r][c].name == "GameObject") {
				G.face.childNodes[r * G.nColumns + c].style.backgroundColor = gridItemColor;
				G.face.childNodes[r * G.nColumns + c].onclick = function clear() { clear_grid(G) };
			}
			else {
				G.face.childNodes[r * G.nColumns + c].onclick = clicked(G.body[r][c], G);
			}
		}
	}
	pause = false;
}

function clicked(object, grid) {
	function click1() {
		clear_grid(grid);
		pause = true; //pausing zombies
		show_moves(object, grid, movesColor);
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function click2() {
			clear_grid(grid);
			grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = click1;
		}
	}
	return click1;
}

function sign(n) {
	if (n >= 0) {
		return +1;
	}
	else {
		return -1;
	}
}

function randInt(n) {
	return Math.floor(Math.random() * Math.floor(n));
}

function animateZombie(zombie, king, grid) {

	setInterval(function () { if (!pause) { zombie.moveOneStep(king, grid); } }, zombie.speed * 1000);
}




// refreshing the positions (CSS) of all the objects on the grid
function refreshPositions(G){
	for (let r=0;r<G.nRows;r++){
		for (let c=0;c<G.nColumns;c++){
			G.body[r][c].x=G.body[r][c].face.offsetLeft;
			G.body[r][c].y=G.body[r][c].face.offsetTop;
			//refresh the bullet (maybe have a different list for bullets ? )
			if (Names.indexOf(G.body[r][c].name) != -1){
				G.body[r][c].bullet.x = G.body[r][c].bullet.face.offsetLeft;
				G.body[r][c].bullet.y = G.body[r][c].bullet.face.offsetTop;
			}
		}
	}
}


module.exports = {sign,put,erase,clear_grid,show_moves,clicked}
