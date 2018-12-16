// this file contains all all class separated functions

function put(object, grid) {

    // updating the grid body
    grid.body[object.r][object.c] = object;
	
    //updating the grid face (for showing)
    grid.face.childNodes[object.r * grid.nColumns + object.c].innerHTML = "<img src ="+ object.face +
    " width = "+ GridItemSize+" height ="+ GridItemSize+"/>";
	grid.face.childNodes[object.r * grid.nColumns + object.c].onclick=function _show(){
		show_moves(object,grid,"white",true);
		grid.face.childNodes[object.r * grid.nColumns + object.c].onclick=function _reset(){
			hide_moves(object,grid);
			grid.face.childNodes[object.r * grid.nColumns + object.c].onclick=_show;
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
                o=new Plant(type,r,c);
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