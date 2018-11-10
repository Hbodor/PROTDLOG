class Grid
{
    constructor(nLignes, nColomns)
    {
        // test if nLignes, nColomns > 0 
        this.nLignes = nLignes;
        this.nColomns = nColomns;
    }

}


class Zombie
{
    constructor()
    {
        this.name = "";
        this.position = [0,0]; //(x,y)
        this.speed = 0;
        this.level = 0;
        this.offence = 0;
        this.defence = 0;
        this.life = 0;
    }

}

class Plant
{
    constructor()
    {
        this.name = "";
        this.position = [0,0]; //(x,y)
        this.moves = [[0,0]]; // the set of all possible [dx,dy] couples on the Grid
        this.offence = 0;
        this.defence = 0;
        this.life = 0;
    }
}

var z1 = new Zombie();
var p1 = new Plant();
var G = new Grid(3,3)

document.write(z1.position + "<br>");
document.write(p1.moves + "<br>");
document.write(G.nColomns);