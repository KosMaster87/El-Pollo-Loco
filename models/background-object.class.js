"use strict";

class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   *
   * @param {*} imagePath
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
