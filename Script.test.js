// all the test should be in this file
var {sign,put,erase,clear_grid} = require("./Functions.js");
//var GameObject = require ("./GameObjects.js")
const {GridItemSize,gridItemColor,size,ZNames} = require ("./TestConstants");
var Zombie = require ("./GameObjects.js");
var Plant = require ("./GameObjects.js");
var GameObject = require ("./GameObjects.js");
var Grid = require ("./Graphics.js");
var {generateNewPiece,selectedPosition,buy} = require ("./Graphics.js");
var status_bar = require ("./Graphics.js");
var Bullet = require ("./Graphics.js");
var {King,Pawn,Queen,Bishop,Knight,Rook} = require ("./GameObjects.js");
//var {generateNewPiece,selectedPosition,buy} = require ("./Graphics.js");



var z=new Zombie(0, 2, 5);
var B=new Bullet(1,1,1,1);
var p= new Plant(2,1);
var grid = new Grid(5,5);




//Unit tests
test("sign of the number", () => {
    expect(sign(5)).toBe(1)
  })

  test("make sure zombie is in the appropriate place", () => {
    expect(z.c).toBe(2)
  })

  test("make sure Plant is in the appropriate place", () => {
    expect(p.r==2 && p.c==1).toBeTruthy()
  })

  test("Test fonctionalities of put ( function that puts the object in the grid) ", () => {
    z.face=document.createElement('Zombie'); // just to avoid Img which works in navigator
    put(z,grid);
    expect(grid.body[z.r][z.c]).toBe(z); //which mine that the grid contains z in the coordinates (z.r,z.c)

  })

  test("Test fonctionalities of eras ( function that delete the object from the grid) ", () => {
    z.face=document.createElement('Zombie'); // just to avoid Img which works in navigator
    put(z,grid);
    erase(z,grid);
    var o = new GameObject(z.r, z.c);
    expect(grid.body[z.r][z.c]).toEqual(o);
  })

  



//Integration Tests

test("Test moveto that uses put and erease ", () => {
  p.face=document.createElement('Plant'); // just to avoid Img which works in navigator
  var o = new GameObject(p.r, p.c);
  put(p,grid);
  expect(grid.body[p.r][p.c]).toBe(p);
  erase(p, grid);
  //moving plant to (4,4)
  p.r = 4;
  p.c = 4;
  put(p, grid);
  expect(grid.body[o.r][o.c]).toEqual(o);
  expect(grid.body[p.r][p.c]).toBe(p);
})








