// all the test should be in this file
const {sign} = require("./Functions.js")
//var GameObject = require ("./GameObjects.js")
var Zombie = require ("./GameObjects.js")
var Plant = require ("./GameObjects.js")

var z=new Zombie(0, 2, 5);
var p= new Plant(2,1);

test("sign of the number", () => {
    expect(sign(5)).toBe(1)
  })

  test("make sure zombie is in the appropriate place", () => {
    expect(z.c).toBe(2)
  })

  test("make sure Plant is in the appropriate place", () => {
    expect(p.r==2 && p.c==1).toBeTruthy()
  })





//setInterval(function(){console.log(z1.x+','+z1.face.offsetLeft);},refreshRate);