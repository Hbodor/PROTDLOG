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
        this.face.style.gridTemplateColumns = "repeat(" + this.nColumns + ","+GridItemSize+")";
        this.face.style.gridTemplateRows = "repeat(" + this.nRows +","+GridItemSize+")";


        for (let i = 0; i < nRows; i++) {
            this.body[i] = [];
            for (let j = 0; j < nColumns; j++) {

                this.body[i].push(new GameObject(i, j));

                //creating html elements
                let element = document.createElement("div");
                element.className = "grid-item";
                element.style.width = GridItemSize;
                element.style.height = GridItemSize;
                element.innerHTML = this.body[i][j].face;
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
    constructor(m, t) {
        // the apperence of the bar 
        this.face = document.createElement("div");
        this.face.className = "stat-bar";
        this.face.gridTemplateRows = StatusBarHeight;

        // a block div that contains the players current money and the timer
        this.stat = document.createElement("div");

        // the playes's money
        this.money = m;
        let Money = document.createElement("div");
        Money.className = "text";
        Money.innerHTML = "Money : " + this.money;
        this.stat.appendChild(Money);

        // the game timer 
        this.timer = t;
        let Timer = document.createElement("div");
        Timer.className = "text";
        Timer.innerHTML = "Timer : " + this.timer;
        this.stat.appendChild(Timer);

        this.face.appendChild(this.stat);

        // contains all the plants and their price
        this.shop = document.createElement("div");
        this.shop.className = "shop";
        this.shop.style.gridTemplateRows = GridItemSize + " " + ButtonHeight;
        this.shop.style.gridTemplateColumns = "repeat(" + 6 +","+GridItemSize+")";

        //putting all pictures in the shop div
        for (let i = 0; i < Pieces.length ; i++) {
            let img = document.createElement("div");
            img.className = "img";
            img.innerHTML = "<img src ="+ Pieces[i] +" width ="+GridItemSize+"height ="+ GridItemSize +"/>";
            this.shop.appendChild(img);
        }
    

        for (let i = 0; i < Pieces.length ; i++) {
            var button = document.createElement("button");
            button.className = "button";
            button.style.height = ButtonHeight;
            button.innerHTML = Prices[i];
            this.shop.appendChild(button);

            button.addEventListener("click", function () {
                if (m - Prices[i]  >= 0) {
                    m -= Prices[i];
                    Money.innerHTML = "Money : " + m;
                }
                else {
                    alert("Sorry! Not enough money!");
                }

            });
        }
        this.face.appendChild(this.shop);

    }

    show() {
        document.body.appendChild(this.face);
    }

}

function put(object, grid) {

    // updating the grid body
    grid.body[object.r][object.c] = object;

    //updating the grid face (for showing)
    grid.face.childNodes[object.r * grid.nColumns + object.c].innerHTML = "<img src ="+ object.face +
    " width = "+ GridItemSize+" height ="+ GridItemSize+"/>";
    
}

function erase(object, grid) {
    o = new GameObject(object.r, object.c);
    grid.body[object.r][object.c] = o;
    grid.face.childNodes[object.r * grid.nColumns + object.c].innerHTML = o.face;
}

function make_game_zone(bar, grid) {
    game = document.createElement("div");
    game.className = "game-zone";
    game.appendChild(bar.face);
    game.appendChild(grid.face);
    document.body.appendChild(game);
}

function show_moves(object, grid)
{
    let L = object.moves(grid);
    for(let i = 0; i<L.length; i++)
    {
        grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = "rgb(150,150,150)";
    }
}
