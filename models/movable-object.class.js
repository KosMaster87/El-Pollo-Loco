"use strict";

class MovableObject {
  x = 80;
  y = 270;
  img;
  height = 150;
  width = 85;
  imageCache = {};
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  /**
   * @param {Load image for any movable caracter.} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Wird in der "character.class.js durch super() gestartet."
   * @param {Array image summary} array
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path; // Path erstellen (nicht der dazugehörige Key.)
      this.imageCache[path] = img; // [path] ist der Individuelle Key für jedes des Bilder. Da ich in der Iterierung mich bereits befinde, gebe ich den selbigen Path als Key ein.
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 & 6; => 1, Rest 1
    let path = this.IMAGES_WALKING[i];
    // let path = this.images[i]; // So will Junus das haben.

    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Bewegt die Wolken und die Hühner
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  moveRight() {}
}
