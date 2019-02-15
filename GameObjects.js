//Diffrent objects used in the game are defined here


// Test Related ==========================================================================================================
// To test This file we uncomment the following block, otherwwise, it should be strictly commented
// let put, erase;

// function init_Functions() {
//   let _put, _erase;
//   function aux() {
//     var {put,erase} = require("./Functions.js");
//     _put = put;
//     _erase = erase;
//   }
//   aux();
//   put = _put;
//   erase = _erase;
// }

// var { GridItemSize, gridItemColor, ZRewards, size, ZNames, border, effectiveBorder, ZSpeed, ZLives, ZAttacks, ZPieces, Attacks, Bullets, Names, Prices, Lives, Pieces, GameIsPaused } = require("./TestConstants");
//========================================================================================================================

class GameObject {
    // A general object class
    constructor(r, c) {
        this.name = "GameObject";
        this.face = "";
        this.r = r; //row
        this.c = c; //colmum
        this.mind = 0;// to store the intervals when animated 
        this.can_move = true; // so we can't move before the animation finishes
    }

    moveto(r, c, G) {
        //moves an object to position (r,c) on grid G
        //only works for plants and zombies
        //can't move unless the animation is finished
        if (this.can_move) {
            this.can_move = false;
            erase(this, G);
            this.r = r;
            this.c = c;
            put(this, G);
            setTimeout(make_move.bind(null, this), 2000);
        }
    }
}

function make_move(object) {

    object.can_move = true;
}

class Zombie extends GameObject {
    //Checkers class
    constructor(level, r, c) {
        // 0 <= level <= 2 (for now !)
        super(r, c);
        this.level = level;
        this.name = ZNames[level];
        this.speed = ZSpeed[level];
        this.life = ZLives[level];
        this.attack = ZAttacks[level];
        this.reward = ZRewards[level];

        // constructing the face tag 
        this.face = document.createElement("img");
        this.face.className = "ZImage";
        this.face.setAttribute('src', ZPieces[level]);
        this.face.setAttribute('height', GridItemSize);
        this.face.setAttribute('width', GridItemSize);
    }

    stepToKing(king) {
        //returns the next step towards the king piece
        let c = 0;
        let r = 0;

        if (king.c != this.c) {
            c = this.c + sign(king.c - this.c);
            r = this.r
        }
        else if (king.r != this.r) {
            c = this.c;
            r = this.r + sign(king.r - this.r);
        }
        return [r, c];
    }

    moveOneStep(king, grid) {
        //Moves the zombie one step towards the king
        let nextStep = this.stepToKing(king);
        if (grid.body[nextStep[0]][nextStep[1]].name == "GameObject") {
            this.moveto(nextStep[0], nextStep[1], grid);
        }
    }

    range(grid) {
        //returns the set of squares on the grid that can be attacked by the zombie
        let L0 = [[1, 0], [0, 1], [-1, 0], [0, -1]];
        let L1 = [[1, 1], [1, -1], [-1, -1], [-1, 1]].concat(L0);
        let L2 = [[2, 0], [0, 2], [-2, 0], [0, -2]].concat(L1);
        let L = [L0, L1, L2];
        let R = [];

        for (let i = 0; i < L[this.level].length; i++) {
            let r = this.r + L[this.level][i][0];
            let c = this.c + L[this.level][i][1];
            if (r >= 0 && r < grid.nRows && c >= 0 && c < grid.nColumns) {
                R.push([r, c]);
            }
        }
        return (R);
    }

    hit(grid, statBar) {
        // makes the zombie attacks once, all plants in range
        let R = this.range(grid);
        if (R.length != 0) {
            for (let i = 0; i < R.length; i++) {
                let r = R[i][0];
                let c = R[i][1];
                if (Names.includes(grid.body[r][c].name)) {

                    grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor = 'black';
                    grid.body[r][c].life -= 1;

                    if (grid.body[r][c].name == "King") {
                        healthBarRefresh(statBar);
                    }

                    if (grid.body[r][c].life == 0) {

                        if (grid.body[r][c].name == "King") {
                            setTimeout(function(){
                                alert("You lost! Your score is " + s.time +" . Press restart to play again, you can do better ;) .");
                                 }, 510)
                            EndGame();
                        }
                        else {
                            clearInterval(grid.body[r][c].mind);
                            erase(grid.body[r][c], grid);
                        }
                    }

                    setTimeout(function () {
                        grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor = gridItemColor;
                    }, 500)
                }
            }
        }
    }
}

class Plant extends GameObject {
    //Chess Pieces general class
    constructor(level, r, c) {
        super(r, c);
        // 0 <= level <= 5 (for now !)
        this.level = level;
        this.name = Names[level];
        this.price = Prices[level];
        this.life = Lives[level];
        this.attack = Attacks[level];
        // constructing the face tag 
        this.face = document.createElement("img");
        this.face.className = "Image";
        this.face.setAttribute('src', Pieces[level]);
        this.face.setAttribute('height', GridItemSize);
        this.face.setAttribute('width', GridItemSize);
    }

    hit(grid, statBar) {
        //Makes the plant attck once, all zombies in range
        let hit = false; // if the plant can hit a zombie
        let R = this.range(grid);
        if (R.length != 0) {
            for (let i = 0; i < R.length; i++) {
                let r = R[i][0];
                let c = R[i][1];
                // the target is a living zombie (we ensure that bullets don't go if the zombie is gonna be dead before they arrive)
                if (ZNames.includes(grid.body[r][c].name) && grid.body[r][c].life > 0) {
                    //animation
                    let bullet = document.createElement("img");
                    bullet.className = "Bullet";
                    bullet.setAttribute('src', 'pieces/Bullet.png');
                    bullet.setAttribute('height', "10px");
                    bullet.setAttribute('width', "10px");
                    grid.face.childNodes[this.r * grid.nColumns + this.c].appendChild(bullet);
                    bullet.style.top = this.face.offsetTop + size / 2 + 'px';
                    bullet.style.left = this.face.offsetLeft + size / 2 + 'px';

                    //transition
                    let target = grid.body[r][c] // the zombie attacked
                    bullet.style.top = target.face.offsetTop + size / 2 - 5 + 'px';
                    bullet.style.left = target.face.offsetLeft + size / 2 - 5 + 'px';
                    target.life -= 1;

                    setTimeout(function (plant) {
                        grid.face.childNodes[plant.r * grid.nColumns + plant.c].removeChild(bullet);
                        if (target.life == 0) {
                            statBar.updateMoney(statBar.getMoney() + target.reward);
                            clearInterval(target.mind);
                            erase(target, grid);
                        }

                    }, 500, this);
                    hit = true;
                }
            }
        }
        return hit;
    }
}


//Game Basic plant pieces
class Pawn extends Plant {
    constructor(r, c) {
        super(0, r, c);
    }
    moves(G) {
        // all possible moves on the grid G
        if (this.c + 1 >= 0 && this.c + 1 < G.nColumns-1 && G.body[this.r][this.c + 1].name == "GameObject") {
            return ([[this.r, this.c + 1]]);
        }
        else {
            return ([]);
        }
    }

    range(G) {
        // all squares on the grid that can be reached by the attack
        if (this.c + 1 >= 0 && this.c + 1 < G.nColumns) {
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
            //using the global variable Moves_L for movments variation
            let r = this.r + Moves_L[i][0];
            let c = this.c + Moves_L[i][1];
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns-1 && G.body[r][c].name == "GameObject") {
                L.push([r, c]);
            }
        }
        return (L);
    }

    range(G) {
        let L = [];
        for (let i = 0; i < Moves_L.length; i++) {
            let r = this.r + Moves_L[i][0];
            let c = this.c + Moves_L[i][1];
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns) {
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

            if (direction1 && r1 >= 0 && r1 < G.nRows && c1 >= 0 && c1 < G.nColumns-1 && G.body[r1][c1].name == "GameObject") {
                L.push([r1, c1]);
            }
            else {
                direction1 = false;
            }

            if (direction2 && r1 >= 0 && r1 < G.nRows && c2 >= 0 && c2 < G.nColumns-1 && G.body[r1][c2].name == "GameObject") {
                L.push([r1, c2]);
            }
            else {
                direction2 = false;
            }

            if (direction3 && r2 >= 0 && r2 < G.nRows && c1 >= 0 && c1 < G.nColumns-1 && G.body[r2][c1].name == "GameObject") {
                L.push([r2, c1]);
            }
            else {
                direction3 = false;
            }

            if (direction4 && r2 >= 0 && r2 < G.nRows && c2 >= 0 && c2 < G.nColumns-1 && G.body[r2][c2].name == "GameObject") {
                L.push([r2, c2]);
            }
            else {
                direction4 = false;
            }
        }
        return (L);
    }

    range(G) {
        let L = [];

        let r = this.r;
        let c = this.c;
        while (r + 1 < G.nRows && c + 1 < G.nColumns && !ZNames.includes(G.body[r][c].name)) {
            r += 1;
            c += 1;
        }
        if (r != this.r || c != this.c) { L.push([r, c]); };

        r = this.r;
        c = this.c;
        while (r - 1 >= 0 && c + 1 < G.nColumns && !ZNames.includes(G.body[r][c].name)) {
            r -= 1;
            c += 1;
        }
        if (r != this.r || c != this.c) { L.push([r, c]); };

        r = this.r;
        c = this.c;
        while (r - 1 >= 0 && c - 1 >= 0 && !ZNames.includes(G.body[r][c].name)) {
            r -= 1;
            c -= 1;
        }
        if (r != this.r || c != this.c) { L.push([r, c]); };

        r = this.r;
        c = this.c;
        while (r + 1 < G.nRows && c - 1 >= 0 && !ZNames.includes(G.body[r][c].name)) {
            r += 1;
            c -= 1;
        }
        if (r != this.r || c != this.c) { L.push([r, c]); };

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

            if (direction3 && c1 >= 0 && c1 < G.nColumns-1 && G.body[this.r][c1].name == "GameObject") {
                L.push([this.r, c1]);
            }
            else {
                direction3 = false;
            }

            if (direction4 && c2 >= 0 && c2 < G.nColumns-1 && G.body[this.r][c2].name == "GameObject") {
                L.push([this.r, c2]);
            }
            else {
                direction4 = false;
            }
        }
        return (L);
    }

    range(G) {
        let L = [];

        let r = this.r;
        let c = this.c;
        while (r + 1 < G.nRows && !ZNames.includes(G.body[r][c].name)) {
            r += 1;
        }
        if (r != this.r) { L.push([r, c]); };

        r = this.r;
        while (r - 1 >= 0 && !ZNames.includes(G.body[r][c].name)) {
            r -= 1;
        }
        if (r != this.r) { L.push([r, c]); };

        r = this.r;
        while (c - 1 >= 0 && !ZNames.includes(G.body[r][c].name)) {
            c -= 1;
        }
        if (c != this.c) { L.push([r, c]); };

        c = this.c;
        while (c + 1 < G.nColumns && !ZNames.includes(G.body[r][c].name)) {
            c += 1;
        }
        if (c != this.c) { L.push([r, c]); };

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

    range(G) {
        let bi = new Bishop(this.r, this.c);
        let ro = new Rook(this.r, this.c);
        return (bi.range(G).concat(ro.range(G)));
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
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns-1 && G.body[r][c].name == "GameObject") {
                    L.push([r, c]); 
            }
        }
        return (L);
    }

    range(G) {
        let L = [];
        for (let i = 0; i < Moves_C.length; i++) {
            let r = this.r + Moves_C[i][0];
            let c = this.c + Moves_C[i][1];
            if (r >= 0 && r < G.nRows && c >= 0 && c < G.nColumns) {
                L.push([r, c]);
            }
        }
        return (L);
    }
}

// Test related ==================================================================================
//module.exports= {Plant,Zombie,King,Pawn,Queen,Bishop,Knight,Rook,GameObject,init_Functions};