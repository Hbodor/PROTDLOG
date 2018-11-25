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

    put(G)
    {
        G.body[this.position[0]][this.position[1]]=this;
    }

    erase(G)
    {
        G.body[this.position[0]][this.position[1]]=new GameObject();
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
    move()
    {

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

    showMoves()
    {

    }

    move()
    {

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
        for(let i = 0; i<nRows; i++)
        {
			this.body[i]=[];
            for(let j = 0; j<nColumns; j++)
            {
                this.body[i].push(new GameObject(1,i,j));
            }
        }
		document.getElementById("grid").style.gridTemplateColumns="repeat("+this.nColumns+",auto)";
		document.getElementById("grid").style.gridTemplateRows="repeat("+this.nRows+",auto)";


    }
    show()
    {
		let container=document.createElement("div");
		container.style
		console.log("showing");
        for(let i = 0; i<this.nRows; i++)
        {
            for(let j = 0; j<this.nColumns;j++)
            {
				console.log("oui");
                //css grid ?
                let element = document.createElement("div");
				element.className='grid-item';
                element.innerHTML=this.body[i][j].face;
                document.getElementById('grid').appendChild(element);
            }
        }
    }


}

var grid=new Grid(5,10)
grid.show()