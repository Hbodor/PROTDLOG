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
		this.face.id="grid";
        this.face.style.gridTemplateColumns = "repeat(" + this.nColumns + ","+GridItemSize+")";
        this.face.style.gridTemplateRows = "repeat(" + this.nRows +","+GridItemSize+")";


        for (let i = 0; i < nRows; i++) {
            this.body[i] = [];
            for (let j = 0; j < nColumns; j++) {

                this.body[i].push(new GameObject(i, j));

                //creating html elements
                let element = document.createElement("div");
                element.style.backgroundColor = gridItemColor;
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
    constructor(m) {
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
        img.innerHTML = "<img src ='Pieces/Money.png' width="+GridItemSize+" />";
        this.money.appendChild(img);

        let rect = document.createElement("div");
        rect.className = "text";
        rect.style.width = GridItemSize;
        rect.style.height = ButtonHeight;
        rect.style.verticalAlign = "middle";
        rect.innerHTML = m;
        
        this.money.appendChild(rect);
        
        this.face.appendChild(this.money);

        // contains all the plants and their price
        this.shop = document.createElement("div");
        this.shop.className = "shop";
        this.shop.style.gridTemplateRows = GridItemSize + " " + ButtonHeight;
        this.shop.style.gridTemplateColumns = "repeat(" + 6 +","+GridItemSize+")";

        //putting all pictures in the shop div
        for (let i = 0; i < Pieces.length ; i++) {
            let img = document.createElement("div");
            img.className = "img";
            img.innerHTML = "<img src ="+ Pieces[i] +" width="+GridItemSize+" />";
            this.shop.appendChild(img);
        }
    

        for (let i = 0; i < Pieces.length ; i++) {
            var button = document.createElement("button");
            button.className = "button";
            button.style.height = ButtonHeight;
            button.innerHTML = Prices[i];
            this.shop.appendChild(button);

            button.addEventListener("click", function () {
                let p = new FakePlant(0, 0);
                if (action===1 && rect.innerHTML - Prices[i] >= 0) {
                    //put(p, grid);
                    action = 2;
                    show_moves(p, grid, "#EC8A8A", true);
                    rect.innerHTML -= Prices[i];
                    type = i;
                }
                else if(action===2) {
                        hide_moves(p, grid);
                        rect.innerHTML -= -Prices[type];
                        action = 1;
                        type = 0;
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
