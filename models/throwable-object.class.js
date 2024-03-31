"use strict";

class ThrowableObject extends MovableObject {
  // y = 100;
  // x = 100;
  width = 40;
  height = 40;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    // this.x = 0;
    // this.y = 300;
    this.throw(800, 0);
  }

  /**
   * Der Wurf der Flaschen.
   */
  throw() {
    // this.x = x;
    // this.y = y;
    this.speedY = 10; // Geschwindigkeit und weg auf der Y-Achse.
    this.applyGravity();
    /**
     * Geschwindigkeit und weg auf der X-Achse.
     */
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
