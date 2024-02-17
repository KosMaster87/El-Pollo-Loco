"use strict";

class Cloud extends MovableObject {
  y = 20;
  width = 500;
  height = 300;
  speed = 0.15;
  IMAGES_CLAUD = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");

    this.loadImages(this.IMAGES_CLAUD);
    // Start the cloud in random place.
    this.x = Math.random() * 500;
    this.animate();
  }

  /**
   * Animate the clouds.
   * In movable-object.class.js
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
