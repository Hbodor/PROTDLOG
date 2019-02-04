// this is where the game is set up 

var grid = new Grid(nRows0, nColumns0);
var s = new status_bar(100, grid);
//showing them inside the page
make_game_zone(s, grid);
let zombieGenerater = 0 // to store the interval that generats zombies




function PauseGame() {
    ButtonHaveEffect = false;
    pause = true;
    GameIsPaused = true;

}

function Resume() {
    clear_grid(grid);
    ButtonHaveEffect = true;
    pause = true;
    GameIsPaused = true;
    onlyOneButtonShouldBeClicked=true;

}


function StartGame(level) {
    clear_grid(grid);
    EndGame();
    GameStarted = true;
    ButtonHaveEffect = true;
    onlyOneButtonShouldBeClicked = true;
    pause = false;
    GameIsPaused = false;

    s.updateMoney(100);

    k = new King(2, 0);
    put(k, grid);
    AutoAttack(k, grid, s);

    s.healthBar.life = Lives[5];
    s.healthBar.bar.style.width = 100 + "%";
    s.face.appendChild(s.healthBar);


    zombieGenerater = setInterval(function () { if (!pause) { GenerateNewZombie(k, grid, s) } }, (15 - (level - 1) * 5) * 1000);
}

function EndGame() {
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
    GameStarted = false;
}