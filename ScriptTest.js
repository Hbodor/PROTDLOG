// all the test should be in this file

z = new Zombie(0, nRows0 - 1, nColumns0 - 1);
z1 = new Zombie(1, nRows0 - 2, nColumns0 - 1);
z2 = new Zombie(2, nRows0 - 3, nColumns0 - 1)
put(z, grid);
put(z1, grid);
put(z2, grid);
animateZombie(z, k, grid);
animateZombie(z1, k, grid);
animateZombie(z2, k, grid);