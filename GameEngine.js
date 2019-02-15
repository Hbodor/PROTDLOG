// This is where the game is set up 


var grid = new Grid(nRows0, nColumns0); //the game grid
var s = new status_bar(100, grid); // the game status bar 

make_game_zone(s, grid); //showing  inside the page

let zombieGenerater = 0 // to store the interval that generats zombies
let timer = 0; // Updating the time elapsed in the game

function PauseGame() {
    //Pauses the game 
    ButtonHaveEffect = false;
    pause = true;
    GameIsPaused = true;
}

function StartGame(level) {
    //Starts the game 

    clear_grid(grid);//some clean up
    EndGame();//clean up

    GameStarted = true;
    ButtonHaveEffect = true;
    onlyOneButtonShouldBeClicked = true;
    pause = false;
    GameIsPaused = false;

    s.updateMoney(100);

    //the game only king
    k = new King(2, 0);
    put(k, grid);
    AutoAttack(k, grid, s);


    s.healthBar.life = k.life;
    s.healthBar.bar.style.width = 100 + "%";
    s.face.appendChild(s.healthBar);

    //generating Zombies (checkers)
    let zcounter = 0;
    zombieGenerater = setInterval(function () {
        if (!pause) {
            zcounter += 1;
            if (zcounter % f(zcounter,level)  == 0) { // the zombie generation frequency is getting bigger as time passes
                GenerateNewZombie(k, grid, s); 
            }
        }
    }, 1000);

    //updating the timer 
    s.updateTimer(-s.time);
    s.face.appendChild(s.timer)
    timer = setInterval(function () { if (!pause) { s.updateTimer(1) } }, 1000);

}

function EndGame() {
    //clears the grid and all intervals
    PauseGame();
    for (let r = 0; r < grid.nRows; r++) {
        for (let c = 0; c < grid.nColumns; c++) {
            if (grid.body[r][c].name != "GameObject") {
                clearInterval(grid.body[r][c].mind);
                erase(grid.body[r][c], grid);
            }
        }
    }
    clearInterval(zombieGenerater);
    clearInterval(timer);
    
    GameStarted = false;
}