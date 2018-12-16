// this file contains all all class separated functions

function put(object, grid) {

    // updating the grid body
    grid.body[object.r][object.c] = object;
	
	object.x=grid.face.childNodes[object.r * grid.nColumns + object.c].offsetLeft;
	object.y=grid.face.childNodes[object.r * grid.nColumns + object.c].offsetTop;
	
	object.element = document.createElement("div");
	object.element.id=object.name+object.r+'x'+object.c;
	object.element.className="object"; //can change the CSS
	object.element.innerHTML="<img src ="+ object.face +" width = "+ GridItemSize+" height ="+ GridItemSize+"/>";
	object.element.style.left=object.x+'px';
	object.element.style.top=object.y+'px';
	grid.face.appendChild(object.element);
	
    //updating the grid face (for showing)
    //grid.face.childNodes[object.r * grid.nColumns + object.c].innerHTML = "<img src ="+ object.face +
    //" width = "+ GridItemSize+" height ="+ GridItemSize+"/>";
	
	
	//Clicking on the cell where the object was put
	object.element.onclick=function _show(){
		show_moves(object,grid,"white",true);
		object.element.onclick=function _reset(){
			hide_moves(object,grid);
			object.element.onclick=_show;
		};
	};
    
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

function show_moves(object, grid, color, add)
{
    let L = object.moves(grid);

    for(let i = 0; i<L.length; i++)
    {
        grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].style.backgroundColor = color;
		if (add){
		grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick=function _move(){
            hide_moves(object,grid);
            if(action===1){
                object.move(L[i],grid);
            }
            else{
                object.move(L[i],grid);
                let r=object.r;
                let c=object.c;
                erase(object,grid);
                if(type==0){o=new Pawn(r,c);}
                else if(type==1){o=new Knight(r,c);}
                else if(type==2){o=new Bishop(r,c);}
                else if(type==3){o=new Rook(r,c);}
                else{o=new Queen(r,c);}
                put(o,grid);
                action=1;
            }			
			};
		}else{
			grid.face.childNodes[L[i][0] * grid.nColumns + L[i][1]].onclick=""
		}
    }
}

function hide_moves(object, grid)
{
    show_moves(object, grid, gridItemColor,false);
}

