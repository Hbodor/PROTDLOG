//diffrent objects used in the game are defined here

class GameObject {
    constructor(r, c) {
        this.name = "GameObject";
        this.face = "";
        this.r = r; //row
        this.c = c; //colmum
		this.alive=true;
    }

    moveto(r, c, G) {
        //only works for plants and zombies
        erase(this, G);
        this.r = r;
        this.c = c;
        put(this, G);
    }
	die(G){
		this.alive=false;
		erase(this,grid);
	}

}

class Zombie extends GameObject {
    constructor(level, r, c) {
        // 0 <= level <= 2
        super(r, c);
        this.level = level;
        this.name = ZNames[level];
        this.speed = ZSpeed[level];
        this.life = ZLives[level];
        this.attack = ZAttacks[level];

        // constructing the face tag 
        this.face = document.createElement("img");
        this.face.className = "ZImage";
        this.face.setAttribute('src', ZPieces[level]);
        this.face.setAttribute('height', GridItemSize);
        this.face.setAttribute('width', GridItemSize);
    }

    stepToKing(king) {

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
        let nextStep = this.stepToKing(king);
        if (grid.body[nextStep[0]][nextStep[1]].name == "GameObject") {
            this.moveto(nextStep[0], nextStep[1], grid);
        }
    }
}

//Bullet class
class Bullet {
	constructor (level,x,y){
		this.x = x;
		this.y = y;
		this.level = level;
		this.attack=Attacks[level];
		this.alive=true; //useless?
		
		// constructing face
		this.face = document.createElement("img");
		this.face.className = "BImage";
		this.face.setAttribute('src',Bullets[0]);
		this.face.style.maxWidth = size/2+"px";
		this.face.style.left=this.x+size+"px";
		this.face.style.top=this.y+size/2+"px";
		
	}
	collision(zombies){
		if (!this.alive){ return (false);}
		for (let i=0;i<zombies.length;i++){
			//collision with zombie is still unclear, the coordinates are sometimes not refreshed correctly?

			if ( zombies[i].alive && (zombies[i].x-this.x<=size/6 && zombies[i].x-this.x>=-size/2) &&  (this.y - zombies[i].y<=size && this.y - zombies[i].y>=-size/2) ) {
				//temp fix, hitbox in x is bigger (even if the bullet goes through the zombie by size/2, we count it as a hit)
				zombies[i].life -= this.attack;
				console.log("hit zombie "+i)
				return (true);
			}
		}
		
	}
	refresh(grid,piece,zombies){
		//refreshing the bullet state, shooting another bullet directly after this one dies, maybe have a cooldown ? 
		if (this.collision(zombies) || this.x == grid.face.clientWidth){
			this.alive=false;
			grid.face.removeChild(this.face);
			piece.can_shoot=true;
		}
	}

}

class Plant extends GameObject {
    constructor(level, r, c) {
        super(r, c);
        // 0 <= level <= 5
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
		//bullet
		this.can_shoot=true;
		this.cooldown=0; //cooldown before next shot
    }
	shoot(G){
		//creating and shooting the straight bullet
		if (this.can_shoot && this.cooldown <=0){
			this.bullet=new Bullet(this.level,this.x,this.y);
			G.face.appendChild(this.bullet.face);
			this.bullet.face.style.left = G.face.clientWidth+'px';
			this.can_shoot=false;
			this.cooldown=cooldown; //refresh the cooldown
		}
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

