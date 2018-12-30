// all game graphic objects are defined here
// this file should be as general as possible 
// keep all specified construction/style in the game engine file

class Grid {
    constructor(nRows, nColumns) {
        // test if nRows, nColumns > 0 
        this.nRows = nRows;
        this.nColumns = nColumns;
        this.body = new Array(nRows); // a list of the diffrent elements on the grid

        //we have to make a function tha does this and take the size in pixels as an argument
        this.face = document.createElement("div");// building the html element 
        this.face.className = "grid-container";//related to css style
        this.face.style.gridTemplateColumns = "repeat(" + this.nColumns + "," + GridItemSize + ")";
        this.face.style.gridTemplateRows = "repeat(" + this.nRows + "," + GridItemSize + ")";

        for (let i = 0; i < nRows; i++) {
            this.body[i] = [];
            for (let j = 0; j < nColumns; j++) {

                this.body[i].push(new GameObject(i, j));

                //creating html elements
                let element = document.createElement("div");
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

//a bar that containts diffrent game information 
class status_bar {
    constructor(m, grid) {
        // the apperence of the bar 
        this.face = document.createElement("div");
        this.face.className = "stat-bar";
        this.face.gridTemplateRows = StatusBarHeight;


        // the playes's money
        this.money = document.createElement("div");
        this.money.className = "Money";
        this.money.style.gridTemplateColumns = GridItemSize;
        this.money.style.gridTemplateRows = GridItemSize + ' ' + ButtonHeight;

        let img = document.createElement("div");
        img.className = "img";
        img.innerHTML = "<img src ='Pieces/Money.png' width=" + GridItemSize + " />";
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

        // contains all the plants and their price
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

    }

    getMoney() {
        return (Number(this.money.childNodes[1].innerHTML));
    }

    updateMoney(newsum) {
        this.money.childNodes[1].innerHTML = newsum;
    }

    show() {
        document.body.appendChild(this.face);
    }

}


function buy(i, bar, grid) {
    function clicked() {
        m = bar.getMoney();
        if (onlyOneButtonShouldBeClicked) {
            onlyOneButtonShouldBeClicked = false;
            if (m - Prices[i] >= 0) {
                pause = true;
                bar.updateMoney(m - Prices[i]);
                selectedPosition(i, grid);
            }
            else {
                alert("Sorry ... Not enough money !");
                onlyOneButtonShouldBeClicked = true;
            }
        }
        else {
            alert("You need to put the piece you have just bought on the grid first ! ")
        }
    }
    return clicked;
}

function selectedPosition(i, grid) {
    for (let r = 0; r < grid.nRows; r++) {
        for (let c = 0; c < grid.nColumns; c++) {
            if (grid.body[r][c].name == "GameObject") {
                grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor = waitingColor;
                grid.face.childNodes[r * grid.nColumns + c].onclick =
                    function clic() {
                        clear_grid(grid);
                        let newPiece = generateNewPiece(i, r, c);
                        put(newPiece, grid);
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
