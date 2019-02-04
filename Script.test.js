// all the test should be in this file
var { sign, put, erase, clear_grid, show_moves, clicked, 
  GenerateNewZombie, showRules} = require("./Functions.js");
//var GameObject = require ("./GameObjects.js")
var { GridItemSize, gridItemColor, size, ZNames, sellingFactor, 
  pause,ButtonHaveEffect,GameIsPaused,Prices, ButtonHaveEffect } = require("./TestConstants");
var { Zombie } = require("./GameObjects.js");
var { Plant } = require("./GameObjects.js");
var { GameObject, init_Functions } = require("./GameObjects.js");
var { Grid } = require("./Graphics.js");
var {selectedPosition, buy, generateNewPiece , sell} = require("./Graphics.js");
var { status_bar } = require("./Graphics.js");
var { Bullet, King } = require("./GameObjects.js");
var { Pawn, Queen } = require("./GameObjects.js");
//var {generateNewPiece,selectedPosition,buy} = require ("./Graphics.js");

init_Functions();

var z = new Zombie(1, 2, 4);
z.face = document.createElement('Zombie'); // just to avoid Img which works in navigator
var K = new King(1, 1);
K.face = document.createElement('King');
var p = new Plant(1, 2, 3);
p.face = document.createElement('Plant'); // just to avoid Img which works in navigator
var grid = new Grid(7, 7);
var P = new Pawn(1, 2);
var Q = new Queen(3, 6);
Q.face = document.createElement('Queen');
var s = new status_bar(100, grid);



//Unit tests
test("sign of the number", () => {
  expect(sign(5)).toBe(1)
})

test("make sure zombie is in the appropriate place", () => {
  expect(z.c).toBe(4);
})

test("make sure Plant is in the appropriate place", () => {
  expect(p.r == 2 && p.c == 3).toBeTruthy();
})

test("Test fonctionalities of put ( function that puts the object in the grid) ", () => {
  z.face = document.createElement('Zombie'); // just to avoid Img which works in navigator
  put(z, grid);
  expect(grid.body[z.r][z.c]).toBe(z); //which mine that the grid contains z in the coordinates (z.r,z.c)

})

test("Test fonctionalities of erase ( function that delete the object from the grid) ", () => {
  z.face = document.createElement('Zombie'); // just to avoid Img which works in navigator
  put(z, grid);
  erase(z, grid);
  var o = new GameObject(z.r, z.c);
  expect(grid.body[z.r][z.c]).toEqual(o);
})

test("Test clear_grid that clears all grids", () => {
  put(Q, grid);
  clicked(Q, grid);
  for (let r = 0; r < grid.nRows; r++) {
    for (let c = 0; c < grid.nColumns; c++) {
      if (grid.body[r][c].name == "GameObject") {
        expect(grid.face.childNodes[r * grid.nColumns + c].style.backgroundColor).toEqual(gridItemColor);
      }
    }
  }
})


test("Test gennerate new zombie", () => {
  put(K, grid);
  GenerateNewZombie(K, grid);
  let test = false;
  for (var r = 0; r < 7; r++) {
    if (grid.body[r][6].name != "GameObject"){
      test=true; // that means there exists a zombie in the grid at the last column
    }
    expect(test).toBeTruthy;
}

})

test("Test PLant generator", () => {
  let pawn= generateNewPiece(0,1,1);
  expect(pawn.name).toEqual("Pawn");
  expect(pawn.r).toBe(1);
  expect(pawn.c).toBe(1);

})

test("Update Money", () => {
  s.updateMoney(80);
  expect(parseInt(s.money.childNodes[1].innerHTML)).toBe(80);
})


//Integration Tests


test("Test moveto that uses put and erease", () => {
  put(z, grid);
  let previousr = z.r;
  let previousc = z.c;
  let o = new GameObject(previousr, previousc);
  z.moveto(4, 4, grid);
  z.face = document.createElement('Zombie');
  expect(z.r == 4 && z.c == 4).toBeTruthy();
  expect(grid.body[o.r][o.c]).toEqual(o);
  expect(grid.body[z.r][z.c]).toBe(z);


})



test("Test hitting a zombie by a plant ", () => {
  var Z = new Zombie(1, 3, 5); //near the pawn
  Z.face = document.createElement('Zombie');
  //expect(Z.c).toBe(3);
  let zlife = Z.life;
  expect(Z.life).toEqual(zlife); //brfore the hit
  put(Q, grid);
  put(Z, grid);
  Q.hit(grid, s);
  expect(Z.life).toEqual(zlife-1); //after the hit

})


test("Test hitting a plant by a zombie ", () => {
  var Z = new Zombie(1, 1, 3); //near the pawn
  Z.face = document.createElement('Zombie');
  let Plife = P.life;
  expect(P.life).toEqual(Plife); // beffor the hit
  put(Q, grid);
  put(Z, grid);
  Z.hit(grid);
  expect(P.life).toEqual(Plife-1);// after the hit

})




test("Test of sellPlant ", () => {
  let q = new Queen(5, 6);
  put(q, grid);
  let price = q.price;
  let money = s.money.childNodes[1].innerHTML;
  sell(q,grid, s);
  let o = new GameObject(5, 6);
  expect(grid.body[5][6]).toEqual(o); // the plant has been erased
  expect(parseInt(s.money.childNodes[1].innerHTML)).toBe(parseInt(money) + price * sellingFactor); //the reward from selling tha plant has been gathered

})


test("Test fonctionalities of buy", () => {
  let i=2;
  ButtonHaveEffect=true; // so as buy has an effect
  let money = parseInt(s.money.childNodes[1].innerHTML);
  buy(i,s,grid);
  expect(parseInt(s.money.childNodes[1].innerHTML)).toBe(money-Prices[i]);


})