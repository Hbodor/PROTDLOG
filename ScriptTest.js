// all the test should be in this file
var { sign, put, erase, clear_grid, show_moves, clicked } = require("./Functions.js");
//var GameObject = require ("./GameObjects.js")
const { GridItemSize, gridItemColor, size, ZNames } = require("./TestConstants");
var { Zombie } = require("./GameObjects.js");
var { Plant } = require("./GameObjects.js");
var { GameObject, init_Functions } = require("./GameObjects.js");
var { Grid } = require("./Graphics.js");
var { generateNewPiece, selectedPosition, buy } = require("./Graphics.js");
var status_bar = require("./Graphics.js");
var { Bullet, King } = require("./GameObjects.js");
var { Pawn, Queen } = require("./GameObjects.js");
//var {generateNewPiece,selectedPosition,buy} = require ("./Graphics.js");

init_Functions();

var z = new Zombie(1, 2, 4);
z.face = document.createElement('Zombie'); // just to avoid Img which works in navigator
var B = new Bullet(1, 1, 1, 1);
var K = new King(1, 1);
var p = new Plant(1, 2, 3);
p.face = document.createElement('Plant'); // just to avoid Img which works in navigator
var grid = new Grid(7, 7);
var P = new Pawn(1, 2);
var Q = new Queen(3, 6);




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

test("Test clear", () => {
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

test("Test clear_gridthat clears the grid from any clicked button (colored elemens of the grid) ", () => {
})


test("Test collision between bullet and zombie ", () => {
  let zlife = z.life;
  B.collision([z]);
  expect(z.life).toEqual(zlife);
  z.x = B.x + 3; //3<=5 and 5 is the chosen value as an extremal
  z.y = B.y;
  B.collision([z]);
  expect(z.life).toEqual(zlife - B.attack);

})