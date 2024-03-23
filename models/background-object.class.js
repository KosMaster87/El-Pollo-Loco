"use strict";

class BackgroundObject extends MovableObject {
  width = 720;
  height = 480;

  /**
   * The background is declared here by the path and its position.
   * Der Hindertgrund wird hier durch den Pfad und dessen Position deklariert.
   * @param {Der Pfad im Projekt} imagePath
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}
