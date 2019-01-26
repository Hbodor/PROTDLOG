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

	if (Names.includes(object.name)) {
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = clicked(object, grid);
	}
}

function erase(object, grid) {
	let o = new GameObject(object.r, object.c);
	grid.body[o.r][o.c] = o;
	grid.face.childNodes[o.r * grid.nColumns + o.c].removeChild(object.face);
	delete object;
	grid.face.childNodes[o.r * grid.nColumns + o.c].onclick = function clear() { if (!GameIsPaused) { clear_grid(grid) } };
}

function show_moves(object, grid, color) {
	let L = object.moves(grid);

	for (let i = 0; i < L.length; i++) {
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = color;
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick =
			function move_to() {
				if (!GameIsPaused) {
					clear_grid(grid);
					object.moveto(L[i][0], L[i][1], grid);
				}
			}
	}
}

function clear_grid(G) {

	for (let r = 0; r < G.nRows; r++) {
		for (let c = 0; c < G.nColumns; c++) {
			if (G.body[r][c].name == "GameObject" || ZNames.includes(G.body[r][c].name)) {
				G.face.childNodes[r * G.nColumns + c].style.backgroundColor = gridItemColor;
				G.face.childNodes[r * G.nColumns + c].onclick = function clear() { if (!GameIsPaused) { clear_grid(G) } };
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
		if (!GameIsPaused) {
			clear_grid(grid);
			pause = true; //pausing zombies
			show_moves(object, grid, movesColor);
			grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function click2() {
				if (!GameIsPaused) {
					clear_grid(grid);
					grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = click1;
				}
			}
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
	//returns a random integer < n
	return Math.floor(Math.random() * Math.floor(n));
}

function animateZombie(zombie, king, grid) {

	zombie.mind = setInterval(function () { if (!pause) { zombie.moveOneStep(king, grid); } }, zombie.speed * 1000);
}

function GenerateNewZombie(king, grid) {
	let r = randInt(grid.nRows);
	if (grid.body[r][grid.nColumns - 1].name == "GameObject") {
		z = new Zombie(randInt(3), r, nColumns0 - 1);
		put(z, grid);
		animateZombie(z, king, grid);
	}
}

function AutoAttack(plant, grid, statBar){
	plant.mind = setInterval(function () { if (!GameIsPaused) { plant.hit(grid, statBar); } }, plant.attack * 1000)
}