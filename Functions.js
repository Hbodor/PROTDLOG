// this file contains all all class separated functions



// //To test This file we uncomment the following block, otherwwise, it should be strictly commented


// var {GridItemSize,gridItemColor,size,ZNames,border,effectiveBorder,Names,movesColor} = require ("./TestConstants");
// var {GameObject} = require ("./GameObjects.js");

// ////////////////////////////////////////////////////////////////////////////////////////////////


function make_game_zone(bar, grid) {
	game = document.createElement("div");
	game.className = "game-zone";
	game.appendChild(bar.face);
	game.appendChild(grid.face);
	document.body.appendChild(game);
	grid.statBar=bar;
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
	//delete object;
	clear_grid(grid); //clearing the grid in case the object is clicked on
	
	
	
	grid.face.childNodes[o.r * grid.nColumns + o.c].onclick = function clear() { if (!GameIsPaused) { clear_grid(grid) } };
}

function show_moves(object, grid, color) {
	//don't show moves when you can't move
	if (!object.can_move)
		return
	
	let L = object.moves(grid);
	// pour l'instant, on utilise la variable globale du statusbar, car sinon il faut modifier les attributs de plusieurs fonctions - à redesign ? 
	grid.statBar.sellButton.disabled=false;
	grid.statBar.sellButton.style.backgroundColor='rgb(255, 215, 0)';
	grid.statBar.sellButton.onclick=function(){
		if (onlyOneButtonShouldBeClicked){
			sellPlant(object,grid,grid.statBar);
		}
		grid.statBar.sellButton.disabled=true;
		grid.statBar.sellButton.style.backgroundColor='rgb(220,220,220)'
	}
	
	for (let i = 0; i < L.length; i++) {
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = color;
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick =
			function move_to() {
				if (!GameIsPaused) {
					clear_grid(grid);
					object.moveto(L[i][0], L[i][1], grid);
					grid.statBar.sellButton.disabled=true;
					grid.statBar.sellButton.style.backgroundColor='rgb(220,220,220)'
				}
			}
	}
	
	//showing the sell button and 
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
			if (object.can_move){
				show_moves(object, grid, movesColor);
				grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = function click2() {
					if (!GameIsPaused) {
						clear_grid(grid);
						grid.statBar.sellButton.disabled=true;
						grid.statBar.sellButton.style.backgroundColor='rgb(220,220,220)';
						grid.face.childNodes[object.r * grid.nColumns + object.c].onclick = click1;
					}
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
	let counter = 0;

	zombie.mind = setInterval(function () {
		counter += 1;
		if (counter % zombie.speed == 0 && !pause) {
			zombie.moveOneStep(king, grid);
		}
		if (counter % zombie.attack == 0 && !GameIsPaused && !pause) {
			zombie.hit(grid);
		}

	}, 1000);
}

function GenerateNewZombie(king, grid) {
	let r = randInt(grid.nRows);
	if (grid.body[r][grid.nColumns - 1].name == "GameObject") {
		z = new Zombie(randInt(3), r, nColumns0 - 1);
		put(z, grid);
		animateZombie(z, king, grid);
	}
}

function AutoAttack(plant, grid, statBar) {
	plant.mind = setInterval(function () { if (!GameIsPaused && !pause) { plant.hit(grid, statBar); } }, plant.attack * 1000)
}


function showRules() {
	let dc = document.getElementById('dc');
	if (dc.className == 'description-container1') {
		dc.className = 'description-container2';
	}
	else {
		dc.className = 'description-container1';
	}
}

function sellPlant(plant, grid, statBar) {
	if (plant.price!=Infinity){
		statBar.updateMoney(statBar.getMoney() + plant.price * sellingFactor);
		window.clearInterval(plant.mind) // deleting the shooting interval
		erase(plant,grid);
	}else{
		alert("You can't sell this piece");
	}
}

function healthBarRefresh(grid){
	let percentage= 100/Lives[5];
	grid.statBar.healthBar.life -= 1; //every hit causes 1 damage
	let newPercentage = grid.statBar.healthBar.life * percentage
	grid.statBar.healthBar.bar.style.width = newPercentage + "%";
	grid.statBar.healthBar.bar.hit.style.width = percentage + "%";

	setTimeout(function(){
		grid.statBar.healthBar.bar.hit.style.width = "0%";
		grid.statBar.healthBar.bar.style.width = newPercentage + "%";
	  }, 500);

}


module.exports = {sign,put,erase,clear_grid,show_moves,clicked}