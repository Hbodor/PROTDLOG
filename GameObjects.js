//diffrent objects used in the game are defined here

class GameObject
{
    constructor(r, c)
    {
        this.name = "GameObject";
        this.face = "O";
        this.r = r; //row
        this.c = c; //colmum
    }     
}

class Zombie extends GameObject
{
    constructor(level, r, c, s)
    {
        // 0 <= level <= 5
        super(r, c);
        this.name = "Zombie";
        this.face = "Z";
        this.level = level;
        this.speed = s;
    }    
}

class Plant extends GameObject
{
    constructor(level, r, c)
    {
        super(r, c);
        // 0 <= level <= 5
        this.level = level;
        this.name =  Names[level];
        this.face = Pieces[level];
        this.price = Prices[level];
        this.life = Lives[level];
        this.attack = Attacks[level];
    }

}

//Game Basic plant pieces
class Pawn extends Plant
{
    constructor(r,c)
    {
        super(0,r,c);
    }
    moves(G)
    {
        if(this.c+1>=0 && this.c+1<G.nColumns)
        {
            return ([[this.r,this.c+1]]);
        }
        else
        {
            return([]);
        }  
    }
}

class Knight extends Plant
{
    constructor()
    {
        super(1,r,c);
    }
    moves(G)
    {
        let L =[];
        for(let m in Moves_L)
        {
            let r = this.r+m[0];
            let c = this.c+m[1];
            if(r>=0 && r<G.nRows && c>=0 && c<G.nColumns)
            {
                L.push([r,c]);
            }
        }
        return(L);
    }

}

class Bishop extends Plant
{
    constructor(r,c)
    {
        super(2, r, c);
    }
    moves(G)
    {
        let L = [];
        for(let i = 1; i<G.nColumns && i<G.nRows ; i++)
        {
            let r1 = this.r+i;
            let r2 = this.r-i;
            let c1 = this.c+i;
            let c2 = this.c-i;
            if(r1>=0 && r1<G.nRows && c1>=0 && c1<G.nColumns)
            {
                L.push([r1,c1]);
            }
            if(r1>=0 && r1<G.nRows && c2>=0 && c2<G.nColumns)
            {
                L.push([r1,c2]);
            }
            if(r2>=0 && r2<G.nRows && c1>=0 && c1<G.nColumns)
            {
                L.push([r2,c1]);
            }
            if(r2>=0 && r2<G.nRows && c2>=0 && c2<G.nColumns)
            {
                L.push([r2,c2]);
            }
        }
        return(L);
    }
}

class Rook extends Plant
{
    constructor(r,c)
    {
        super(3,r,c);
    }
    moves(G)
    {
        let L = [];
        for(let i = 1; i<G.nColumns || i<G.nRows ; i++)
        {
            let r1 = this.r+i;
            let r2 = this.r-i;
            let c1 = this.c+i;
            let c2 = this.c-i;
            if(r1>=0 && r1<G.nRows )
            {
                L.push([r1,this.c]);
            }
            if(r2>=0 && r2<G.nRows)
            {
                L.push([r2,this.c]);
            }
            if(c1>=0 && c1<G.nColumns)
            {
                L.push([this.r,c1]);
            }
            if(c2>=0 && c2<G.nColumns)
            {
                L.push([this.r,c2]);
            }
        }
        return(L);
    }
}

class Queen extends Plant
{
    constructor(r,c)
    {
        super(4,r,c);
    }
    moves(G)
    {
        let bi = new Bishop(this.r, this.c);
        let ro = new Rook(this.r, this.c);
        return( bi.moves(G).concat(ro.moves(G)));
    }
}

class King extends Plant
{
    constructor(r,c)
    {
        super(5,r,c);
    }
    moves(G)
    {
        for(let m in Moves_C)
        {
            let L = [];
            let r = this.r + m[0];
            let c = this.c + m[1];
            if(r>=0 && r<G.nRows && c>=0 && c<G.nColumns)
            {
                L.push([r,c])

            }

        }
    }

}

