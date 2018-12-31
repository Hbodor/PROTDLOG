// all the test should be in this file

z = new Zombie(0, 2, nColumns0 - 1);
z1 = new Zombie(1, nRows0 - 2, nColumns0 - 1);
z2 = new Zombie(2, nRows0 - 3, nColumns0 - 1)

p1 = new Pawn(nRows0 - 2, 0);
p2 = new Pawn(nRows0 - 3, 0);

put(p1,grid);
put(p2,grid);
put(z, grid);
put(z1, grid);
put(z2, grid);
animateZombie(z, k, grid);
animateZombie(z1, k, grid);
animateZombie(z2, k, grid);
setInterval(function(){refreshPositions(grid,zombies);},refreshRate);
let zombies = [z,z1,z2];

k.shoot(grid);



//setInterval(function(){console.log(z1.x+','+z1.face.offsetLeft);},refreshRate);