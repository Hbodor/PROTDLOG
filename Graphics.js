// All game graphic objects are defined here

//====== Test related ======================================================================================================
// // To test This file we uncomment the following block, otherwwise, it should be strictly commented

// var { GridItemSize, gridItemColor, size, ZNames, border, effectiveBorder, StatusBarHeight, ButtonHeight, font_size,
//     Pieces, Prices, Lives,  ButtonHaveEffect } = require("./TestConstants");
// var { GameObject } = require("./GameObjects.js");
// var { King, Pawn, Queen, Bishop, Knight, Rook, Plants, Zombie, Bullet } = require("./GameObjects.js");

//==========================================================================================================================

class Grid {
    constructor(nRows, nColumns) {
        //nRows, nColumns > 0 
        this.nRows = nRows;
        this.nColumns = nColumns;
        this.body = new Array(nRows); // a list of the diffrent elements on the grid

        // building the html grid element
        this.face = document.createElement("div");
        this.face.className = "grid-container";
        this.face.style.gridTemplateColumns = "repeat(" + this.nColumns + "," + GridItemSize + ")";
        this.face.style.gridTemplateRows = "repeat(" + this.nRows + "," + GridItemSize + ")";

        for (let i = 0; i < nRows; i++) {
            this.body[i] = [];
            for (let j = 0; j < nColumns; j++) {

                this.body[i].push(new GameObject(i, j));

                //creating html grid item elements
                let element = document.createElement("div");
                element.className = "grid-item";
                element.style.backgroundColor = gridItemColor;
                element.style.width = GridItemSize;
                element.style.height = GridItemSize;
                this.face.appendChild(element);
            }
        }
    }
    show() {
        //putting the grid in the html body
        document.body.appendChild(this.face);
    }

}

//A status bar that containts diffrent game information 
class status_bar {
    constructor(m, grid) {
        // the apperence of the bar ================================================================
        this.face = document.createElement("div");
        this.face.className = "stat-bar";
        this.face.gridTemplateRows = StatusBarHeight;


        // The playes's money  =====================================================================
        this.money = document.createElement("div");
        this.money.className = "Money";
        this.money.style.gridTemplateColumns = GridItemSize;
        this.money.style.gridTemplateRows = GridItemSize + ' ' + ButtonHeight;

        let img = document.createElement("div");
        img.className = "img";
        img.innerHTML = "<img src ='pieces/Money.png' width=" + GridItemSize + " />";
        this.money.appendChild(img);

        let rect = document.createElement("div");
        rect.className = "text";
        rect.style.width = GridItemSize;
        rect.style.height = ButtonHeight;
        rect.style.fontSize = font_size + "px"
        rect.style.verticalAlign = "center";
        rect.innerHTML = m;

        this.money.appendChild(rect);

        this.face.appendChild(this.money);

        // The shop that contains all the plants and their price ===============================
        this.shop = document.createElement("div");
        this.shop.className = "shop";
        this.shop.style.gridTemplateRows = GridItemSize + " " + ButtonHeight;
        this.shop.style.gridTemplateColumns = "repeat(" + 5 + "," + GridItemSize + ")";

        //putting all pictures in the shop div
        for (let i = 0; i < Pieces.length - 1; i++) {
            let img = document.createElement("div");
            img.className = "img";
            img.innerHTML = "<img src =" + Pieces[i] + " width=" + GridItemSize + " />";
            this.shop.appendChild(img);
        }

        //creating the buttons
        for (let i = 0; i < Pieces.length - 1; i++) {
            var button = document.createElement("button");
            button.className = "button";
            button.style.height = ButtonHeight;
            button.style.fontSize = font_size + "px";
            button.innerHTML = Prices[i];
            this.shop.appendChild(button);
            button.addEventListener("click", buy(i, this, grid));
        }

        this.face.appendChild(this.shop);

        //Creating the selling button =========================================================
        var SellButton = document.createElement("button");
        SellButton.className = 'sell-button';
        SellButton.innerHTML = 'Sell';
        SellButton.addEventListener("click", sell(this, grid));
        this.face.appendChild(SellButton);

        //Creating the Pause button ==========================================================
        var PauseButton = document.createElement("button");
        PauseButton.className = 'game-button';
        PauseButton.innerHTML = 'Pause';
        PauseButton.addEventListener("click", function () {
            if (GameStarted) {
                if (GameIsPaused) {
                    clear_grid(grid);
                    PauseButton.style.backgroundColor = "rgb(0, 98, 122)";
                    ButtonHaveEffect = true;
                    pause = false;
                    GameIsPaused = false;
                    PauseButton.innerHTML = 'Pause';
                }
                else {
                    PauseButton.innerHTML = 'Resume';
                    clear_grid(grid);
                    onlyOneButtonShouldBeClicked = true;
                    PauseGame();
                    PauseButton.style.backgroundColor = "rgb(192, 0, 0)";
                }
            }
        });

        //Creating the Start button ===========================================================
        var StartButton = document.createElement("button");
        StartButton.className = 'game-button';
        StartButton.innerHTML = 'Start';
        StartButton.addEventListener("click", function () {
            StartButton.innerHTML = 'Restart';
            StartGame(GameLevel);
            PauseButton.style.backgroundColor = "rgb(0, 98, 122)";
            PauseButton.innerHTML = 'Pause';

        });

        //Putting buttons on the status bar
        this.GameButtons = document.createElement('div');
        this.GameButtons.className = 'controls';

        this.GameButtons.appendChild(StartButton);
        this.GameButtons.appendChild(PauseButton);

        this.face.appendChild(this.GameButtons);

        //Creating the King's health bar  ====================================================
        this.healthBar = document.createElement("div");
        this.healthBar.className = 'health-bar';
        this.healthBar.bar = document.createElement("div");
        this.healthBar.bar.className = 'bar';
        this.healthBar.bar.hit = document.createElement("div");
        this.healthBar.bar.hit.className = 'hit';
        this.healthBar.life = 0;
        this.healthBar.bar.appendChild(this.healthBar.bar.hit);
        this.healthBar.appendChild(this.healthBar.bar);

        //Defining the timer ==================================================================
        this.time = 0
        this.timer = document.createElement("div");
        this.timer.className = 'timer';
        this.timer.innerHTML = "Timer : " + this.time + " s";
		this.timer.title = this.time;


    }

    getMoney() {
        //Returns the amount of money left 
        return (Number(this.money.childNodes[1].innerHTML));
    }

    updateMoney(newsum) {
        //updates the money to a new sum
        this.money.childNodes[1].innerHTML = newsum;
    }

    updateTimer(seconds) {
        //updates the timer to a new time
        this.time += seconds;
        this.timer.innerHTML = "Timer : " + this.time + " s";
		this.timer.title = this.time;
    }

    show() {
        document.body.appendChild(this.face);
    }

}


function buy(i, bar, grid) {
    // Returns a function that allows the (i th) buying button to work
    return function () {
        if (ButtonHaveEffect) {
            m = bar.getMoney();
            if (onlyOneButtonShouldBeClicked) {
                // if we didnt press another buying button
                onlyOneButtonShouldBeClicked = false;
                if (m - Prices[i] >= 0) {
                    //pausing all zombies moves and wait for the selected position
                    pause = true;
                    selectedPosition(i, grid, bar);
                }
                else {
                    alert("Sorry ... Not enough money !");
                    onlyOneButtonShouldBeClicked = true;
                }
            }
            else {
                alert("Sorry you can't buy now ! ")
            }
        }
    };
}

function sell(bar, grid) {
    // Returns a function that allows the selling button to work
    return function () {
        if (ButtonHaveEffect) {
            if (onlyOneButtonShouldBeClicked) {
                for (let r = 0; r < grid.nRows; r++) {
                    for (let c = 0; c < grid.nColumns; c++) {
                        let Piece = grid.body[r][c];
                        if (Names.includes(Piece.name) && Piece.name != 'King') {

                            onlyOneButtonShouldBeClicked = false;
                            pause = true;
                            
                            grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor = waitingColor;
                            grid.face.childNodes[r * grid.nColumns + c].onclick =
                                function () {
                                    bar.updateMoney(bar.getMoney() + Math.floor(Piece.price * Piece.life / Lives[Piece.level]));
                                    clearInterval(Piece.mind);
                                    erase(Piece, grid);
                                    clear_grid(grid);
                                    onlyOneButtonShouldBeClicked = true;
                                    pause = false;
                                };
                        }
                        else if (Piece.name == 'King') {
                            grid.face.childNodes[r * grid.nColumns + c].onclick = function(){onlyOneButtonShouldBeClicked = true;
											     clear_grid(grid);};
                        }
                        else {
                            grid.face.childNodes[r * grid.nColumns + c].onclick = "";
                        }
                    }
                }
            }
            else {
                alert("Sorry you can't sell now ! ")
            }
        }
    };
}

function selectedPosition(i, grid, bar) {
    // mmakes the grid ready to accept a new piece
    for (let r = 0; r < grid.nRows; r++) {
        for (let c = 0; c < grid.nColumns-1; c++) {
            if (grid.body[r][c].name == "GameObject") {
                grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor = waitingColor;
                grid.face.childNodes[r * grid.nColumns + c].onclick =
                    function () {
                        clear_grid(grid);
                        let newPiece = generateNewPiece(i, r, c);
                        put(newPiece, grid);
                        m = bar.getMoney();
                        bar.updateMoney(m - Prices[i]);
                        AutoAttack(newPiece, grid, bar);
                        onlyOneButtonShouldBeClicked = true;
                    };
            }
            else {
                grid.face.childNodes[r * grid.nColumns + c].onclick = "";
            }

        }
    }
}

function generateNewPiece(i, r, c) {
    //Creates a new piece using its rank (i) in the shop
    if (i == 0) {
        return new Pawn(r, c);
    }
    if (i == 1) {
        return new Knight(r, c);
    }
    if (i == 2) {
        return new Bishop(r, c);
    }
    if (i == 3) {
        return new Rook(r, c);
    }
    if (i == 4) {
        return new Queen(r, c);
    }
}

// Test related ======================================================================
//module.exports = { selectedPosition, Grid, status_bar, buy, generateNewPiece, sell };
