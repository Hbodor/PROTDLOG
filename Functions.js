// This file contains all all class separated functions


//Test related ==========================================================================================================================
// //To test This file we uncomment the following block, otherwwise, it should be strictly commented

// var { GridItemSize, gridItemColor, size, ZNames, border, effectiveBorder, Names, movesColor, sellingFactor, nColumns0 } = require("./TestConstants");
// var { GameObject, Zombie } = require("./GameObjects.js");
//======================================================================================================================================

function make_game_zone(bar, grid) {
	//creates the game zone : made of the grid and the stat bar
	game = document.createElement("div");
	game.className = "game-zone";
	game.appendChild(bar.face);
	game.appendChild(grid.face);
	document.body.appendChild(game);
}

function put(object, grid) {
	//Puts an object on the grid

	// updating the grid's body
	grid.body[object.r][object.c] = object;

	//updating the grid's  face
	grid.face.childNodes[object.r * grid.nColumns + object.c].appendChild(object.face);
	
	//For CSS transition
	object.face.style.top = grid.face.childNodes[object.r * grid.nColumns + object.c].offsetTop + 'px';
	object.face.style.left = grid.face.childNodes[object.r * grid.nColumns + object.c].offsetLeft + 'px';

	//if a plant 
	if (Names.includes(object.name)) {
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = clicked(object, grid);
	}
}

function erase(object, grid) {
	//Erases an object from the grid 
	
	let o = new GameObject(object.r, object.c);
	grid.body[o.r][o.c] = o;
	if (object.face.parentNode == grid.face.childNodes[o.r * grid.nColumns + o.c]){
		grid.face.childNodes[o.r * grid.nColumns + o.c].removeChild(object.face);
	}

	grid.face.childNodes[o.r * grid.nColumns + o.c].onclick = function clear() { if (!GameIsPaused) { clear_grid(grid) } };
}

function show_moves(object, grid, color) {
	// Shows all the plant possible moves

	//don't show moves when you can't move
	if (!object.can_move)
		return
	
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

	//gets the grid to initial playing conditions 

	for (let r = 0; r < G.nRows; r++) {
		for (let c = 0; c < G.nColumns-1; c++) {
			if (G.body[r][c].name == "GameObject" || ZNames.includes(G.body[r][c].name)) {
				G.face.childNodes[r * G.nColumns + c].style.backgroundColor = gridItemColor;
				G.face.childNodes[r * G.nColumns + c].onclick = function clear() { if (!GameIsPaused) { clear_grid(G) } };
			}
			else {
				G.face.childNodes[r * G.nColumns + c].style.backgroundColor = gridItemColor;
				G.face.childNodes[r * G.nColumns + c].onclick = clicked(G.body[r][c], G);
			}
		}
	}
	pause = false;
}

function clicked(object, grid) {
	//returns a function that can be assosiated with a piece to show its moves when clicked
	return function click1() {
		if (!GameIsPaused) {
			clear_grid(grid);
			pause = true; //pausing zombies
			if (object.can_move){
				show_moves(object, grid, movesColor);
				grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function () {
					if (!GameIsPaused) {
						clear_grid(grid);
						grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = click1;
					}
				}
			}

		}
	}
	;
}

function sign(n) {
	//return the sign of a number 
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

function animateZombie(zombie, king, grid, statBar) {
	// sets an interval to move the zombie 
	let moveCounter = 0;
	let attackCounter = 0;
	zombie.mind = setInterval(function () {
		if (!pause){
			moveCounter+=1;
			if (moveCounter % zombie.speed == 0) {
				zombie.moveOneStep(king, grid);
			}
			if (!GameIsPaused){
				attackCounter+=1
				if (attackCounter % zombie.attack == 0 ) {
					zombie.hit(grid,statBar);
				}
			}
		}


	}, 1000);
}

function GenerateNewZombie(king, grid, statBar) {
	//Generates a new zombie on a random row (last columns)
	let r = randInt(grid.nRows);
	if (grid.body[r][grid.nColumns - 1].name == "GameObject") {
		z = new Zombie(randInt(3), r, nColumns0 - 1);
		put(z, grid);
		animateZombie(z, king, grid, statBar);
	}
}

function AutoAttack(plant, grid, statBar) {
	//sets an interval for plants attacks
	let attackCounter = 0 ;
	plant.mind = setInterval(function () { 
		
		if (!GameIsPaused && !pause) {
			attackCounter+=1;
			if (attackCounter>=plant.attack && plant.can_move){
				if (plant.hit(grid, statBar)){
					attackCounter=0;
				}
			}
			
		} 
		
	}, 1000)
}


function showRules() {
	// Related to the button "game description" 
	let dc = document.getElementById('dc');
	if (dc.className == 'description-container1') {
		dc.className = 'description-container2';
	}
	else {
		dc.className = 'description-container1';
	}
}


function healthBarRefresh(statBar){
	// Updates the king's health bar when it's hit 
	let percentage = 100/Lives[5];
	statBar.healthBar.life -= 1; //every hit causes 1 damage
	let newPercentage = statBar.healthBar.life * percentage
	statBar.healthBar.bar.style.width = newPercentage + "%";
	statBar.healthBar.bar.hit.style.width = percentage + "%";

	setTimeout(function(){
		statBar.healthBar.bar.hit.style.width = "0%";
		//statBar.healthBar.bar.style.width = newPercentage + "%";
	  }, 500);
}


function f(k,level){
	//returns the number of seconds to wait before generating another zombie
	//k in the number of times we execute the interval generating the zombies 
	let n = Math.floor(k/41);
	let r =  (20 - (level-1)*2)-3*n;
	if(r>0){
		return r;
	}
	else {
		return 1;
	}
}

// Test related =========================================================================
//module.exports = {sign, put, erase, clear_grid, show_moves, clicked, GenerateNewZombie, showRules, make_game_zone}
