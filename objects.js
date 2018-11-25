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
    constructor()
    {
        super();
        this.name = "Zombie";
        this.face = "Z";
        this.speed = 0;
    }
    move()
    {

    }
}

class Plant extends GameObject
{
    constructor()
    {
        super();
        this.name = "Plant";
        this.face = "P";
        this.moves = [[0,0]]; // list of all possible moves
        this.price = 0;
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
    constructor(nRows, nColomns)
    {
        // test if nRows, nColomns > 0 
        this.nRows = nRows;
        this.nColomns = nColomns;
        this.body = [for (i of range(1,nRows)) []]; // a list of the diffrent elements on the grid
        for(let i = 0; i<nRows; i++)
        {
            for(let j = 0; j<nColomns; j++0)
            {
                this.body[i].push(new GameObject())
            }
        }
    }
    show()
    {
        for(let i = 0; i<this.nLRows; i++)
        {
            for(let j = 0; j<this.nColomns)
            {
                //css grid ?
                let element = document.createElement("div");
                element.style.position = "absolute";
                element.style.left = (i * 80) + "px";
                let node = document.createTextNode(this.body[i][j].face);
                document.body.appendChild(node);
            }
            document.write("<br>");
        }
    }


}
