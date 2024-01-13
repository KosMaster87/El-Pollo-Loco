"use strict";

class Level {
  background;
  clouds;
  enemies;
  level_end_x = 5800;

  constructor(enemies, clouds, background) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.background = background;
  }
}
