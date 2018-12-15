//diffrent objects used in the game are defined here

class GameObject {
    constructor(r, c) {
        this.name = "GameObject";
        this.face = "";
        this.r = r; //row
        this.c = c; //colmum
    }
}

class Zombie extends GameObject {
    constructor(level, r, c, s) {
        // 0 <= level <= 5
        super(r, c);
        this.name = "Zombie";
        this.face = "Z";
        this.level = level;
        this.speed = s;
    }
}

class Plant extends GameObject {
    constructor(level, r, c) {
        super(r, c);
        // 0 <= level <= 5
        this.level = level;
        this.name = Names[level];
        this.face = Pieces[level];
        this.price = Prices[level];
        this.life = Lives[level];
        this.attack = Attacks[level];
    }
    move(action, G) {

        var temp_moves = this.moves(G);
        var i;
        for (i = 0; i < temp_moves.length; i++) {
            if (action[0] == temp_moves[i][0] && action[1] == temp_moves[i][1]) {
                erase(this, G);
                this.r = action[0];
                this.c = action[1];
                put(this, G);
                return true;
            }
        }
        return false;
    }
}

//Game Basic plant pieces
class Pawn extends Plant {
    constructor(r, c) {
        super(0, r, c);
    }
    moves(G) {
        if (this.c + 1 >= 0 && this.c + 1 < G.nColumns && G.body[this.r][this.c + 1].name == "GameObject") {
            return ([[this.r, this.c + 1]]);
        }
        else {
            return ([]);
        }
    }
}

class Knight extends Plant {
    constructor(r, c) {
        super(1, r, c);
    }
    moves(G) {
        let L = [];
        for (let i = 0; i < Moves_L.length; i++) {
            let r = this.r + Moves_L[i][0];
            let c = this.c + Moves_L[i][1];
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns && G.body[r][c].name == "GameObject") {
                L.push([r, c]);
            }
        }
        return (L);
    }

}

class Bishop extends Plant {
    constructor(r, c) {
        super(2, r, c);
    }
    moves(G) {
        let L = [];
        let direction1 = true;
        let direction2 = true;
        let direction3 = true;
        let direction4 = true;

        for (let i = 1; i < G.nColumns && i < G.nRows; i++) {
            let r1 = this.r + i;
            let r2 = this.r - i;
            let c1 = this.c + i;
            let c2 = this.c - i;

            if (direction1 && r1 >= 0 && r1 < G.nRows && c1 >= 0 && c1 < G.nColumns && G.body[r1][c1].name == "GameObject") {
                L.push([r1, c1]);
            }
            else {
                direction1 = false;
            }

            if (direction2 && r1 >= 0 && r1 < G.nRows && c2 >= 0 && c2 < G.nColumns && G.body[r1][c2].name == "GameObject") {
                L.push([r1, c2]);
            }
            else {
                direction2 = false;
            }

            if (direction3 && r2 >= 0 && r2 < G.nRows && c1 >= 0 && c1 < G.nColumns && G.body[r2][c1].name == "GameObject") {
                L.push([r2, c1]);
            }
            else {
                direction3 = false;
            }

            if (direction4 && r2 >= 0 && r2 < G.nRows && c2 >= 0 && c2 < G.nColumns && G.body[r2][c2].name == "GameObject") {
                L.push([r2, c2]);
            }
            else {
                direction4 = false;
            }
        }
        return (L);
    }
}

class Rook extends Plant {
    constructor(r, c) {
        super(3, r, c);
    }
    moves(G) {
        let L = [];
        let direction1 = true;
        let direction2 = true;
        let direction3 = true;
        let direction4 = true;

        for (let i = 1; i < G.nColumns || i < G.nRows; i++) {
            let r1 = this.r + i;
            let r2 = this.r - i;
            let c1 = this.c + i;
            let c2 = this.c - i;
            if (direction1 && r1 >= 0 && r1 < G.nRows && G.body[r1][this.c].name == "GameObject") {
                L.push([r1, this.c]);
            }
            else {
                direction1 = false;
            }

            if (direction2 && r2 >= 0 && r2 < G.nRows && G.body[r2][this.c].name == "GameObject") {
                L.push([r2, this.c]);
            }
            else {
                direction2 = false;
            }

            if (direction3 && c1 >= 0 && c1 < G.nColumns && G.body[this.r][c1].name == "GameObject") {
                L.push([this.r, c1]);
            }
            else {
                direction3 = false;
            }

            if (direction4 && c2 >= 0 && c2 < G.nColumns && G.body[this.r][c2].name == "GameObject") {
                L.push([this.r, c2]);
            }
            else {
                direction4 = false;
            }
        }
        return (L);
    }
}

class Queen extends Plant {
    constructor(r, c) {
        super(4, r, c);
    }
    moves(G) {
        let bi = new Bishop(this.r, this.c);
        let ro = new Rook(this.r, this.c);
        return (bi.moves(G).concat(ro.moves(G)));
    }
}

class King extends Plant {
    constructor(r, c) {
        super(5, r, c);
    }
    moves(G) {
        let L = [];
        for (let i = 0; i < Moves_C.length; i++) {
            let r = this.r + Moves_C[i][0];
            let c = this.c + Moves_C[i][1];
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns && G.body[r][c].name == "GameObject") {
                L.push([r, c]);
            }
        }
        return (L);
    }
}

class FakePlant extends Plant {
    constructor(r, c) {
        super(5, r, c);
    }
    moves(G) {
        let L = [];
        for (let i = 0; i < G.nRows; i++) {
            for (let j = 0; j<G.nColumns; j++) {
                let r = i;
                let c = j;
                if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns && G.body[r][c].name == "GameObject") {
                    L.push([r, c]);
                }
            }

        }
        return (L);
    }
}
