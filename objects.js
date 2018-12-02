pieces = ['pieces/King.png', 'pieces/Queen.png', 'pieces/Rook.png',
'pieces/Bishop.png', 'pieces/Knight.png', 'pieces/Pawn.png']




class GameObject
{
    constructor(level, r, c)
    {
        // 1<= level <= 5
        this.name = "GameObject";
        this.face = "O";
        this.position = [r,c]; //(row,colmum)
        this.level = level;
        // à discuter
        this.offence = 6*level;
        this.defence = level;
        this.life = 10*level;
    }     
}

class Zombie extends GameObject
{
    constructor(level, r, c, s)
    {
        super(level, r, c);
        this.name = "Zombie";
        this.face = "Z";
        this.speed = s;
    }    
}

class Plant extends GameObject
{
    constructor(level, r, c, p)
    {
        super();
        this.name = "Plant";
        this.face = "P";
        this.moves = [[0,0]]; // list of all possible moves
        this.price = p;
    }
}


class Grid
{
    constructor(nRows, nColumns)
    {
        // test if nRows, nColumns > 0 
        this.nRows = nRows;
        this.nColumns = nColumns;
        this.body = new Array(nRows); // a list of the diffrent elements on the grid

        this.face =  document.createElement("div");// building the html element 
        this.face.className = "grid-container";//related to css style
        this.face.style.gridTemplateColumns="repeat("+this.nColumns+",auto)";
        this.face.style.gridTemplateRows="repeat("+this.nRows+",auto)";
        //this.face.style.width = 60*this.nColumns+"px";
        //this.face.style.height = 60*this.nRows+"px";

        for(let i = 0; i<nRows; i++)
        {
			this.body[i]=[];
            for(let j = 0; j<nColumns; j++)
            {

                this.body[i].push(new GameObject(1,i,j));

                //creating html elements
                let element = document.createElement("div");
				element.className="grid-item";
                element.innerHTML=this.body[i][j].face;
                this.face.appendChild(element);

            }
        }
    }
    show()
    {

        //putting the grid in the html body
        document.body.appendChild(this.face);
    }

}

//a bar that containts diffrent game information 
class status_bar
{
    constructor(m, t)
    {
        // the apperence of the bar 
        this.face = document.createElement("div");
        this.face.className = "stat-bar";
        
        // a block div that contains the players current money and the timer
        this.stat = document.createElement("div").appendChild(document
            .createElement("ul"));
        
        // the playes's money
        this.money = m; 
        let Money = document.createElement("li");
        Money.className = "text";
        Money.innerHTML = "Money : "+this.money;
        this.stat.appendChild(Money);

         // the game timer 
        this.timer = t;
        let Timer = document.createElement("li");
        Timer.className = "text";
        Timer.innerHTML = "Timer : "+this.timer;
        this.stat.appendChild(Timer);

        this.face.appendChild(this.stat);

        // contains all the plants and their price
        this.shop = document.createElement("div");
        this.shop.className = "shop";

        //putting all pictures in the shop div
        for(let i = 0 ; i<pieces.length-1 ; i++)
        {
            let img = document.createElement("div");
            img.className = "img";
            img.innerHTML = "<img src = 'King.png' width = '20%' height = auto/>";
            this.shop.appendChild(img);
        }

        for(let i = 0 ; i<pieces.length-1 ; i++)
        {
            let price = document.createElement("div");
            price.className = "text";
            price.innerHTML = (i+1)*10;
            this.shop.appendChild(price);
        }
        this.face.appendChild(this.shop);
        
    }

    show()
    {
        document.body.appendChild(this.face);
    }

}

function put(object, grid)
{

    // updating the grid body
    grid.body[object.position[0]][object.position[1]]=object;

    //updating the grid face (for showing)
    grid.face.childNodes[object.position[0]*grid.nColumns + object.position[1]].innerHTML = object.face;

}

function erase(object, grid)
{
    put(new GameObject(1, object.position[0], object.position[1]), grid);  
}

function make_game_zone(bar, grid)
{
    game = document.createElement("div");
    game.className = "game-zone" ;
    game.appendChild(bar.face);
    game.appendChild(grid.face);
    document.body.appendChild(game);
}

//testing
var grid=new Grid(4,10);
var s = new status_bar(100,100);
make_game_zone(s,grid);







//Game Basic plant pieces
class Pawn extends Plant
{

}

class Knight extends Plant
{

}

class Bishop extends Plant
{

}

class Rook extends Plant
{

}

class Queen extends Plant
{

}

class King extends Plant
{

}

// Game basic zombie pieces
