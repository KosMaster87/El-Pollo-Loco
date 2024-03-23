"use strict";

class ThrowableObject extends MovableObject {
  // y = 100;
  // x = 100;
  width = 40;
  height = 40;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 0;
    this.y = 0;
    this.trow();
  }

  /**
   * 
   */
  trow() {
    // this.x = x;
    // this.y = y;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
