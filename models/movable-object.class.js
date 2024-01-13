"use strict";

class MovableObject {
  imageCache = {};
  currentImage = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 1;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 26);
  }

  isAboveGround() {
    return this.y < 260;
  }

  /**
   * @param {Load image for any movable caracter.} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Import from world.class.js
   * @param {each movable object} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Import from world.class.js
   * InstanceOf bedeutet, dass nur die in der if Bediengung markierten Objekte die Umrandung bekommen.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      /**
       * Import from world.class.js
       * Red rectangle
       */
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Wird in der "character.class.js durch super() gestartet."
   * @param {Array image summary} array
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image();
      img.src = path; // Path erstellen (nicht der dazugehörige Key.)
      this.imageCache[path] = img;
      // [path] ist der Individuelle Key für jedes des Bilder.
      // Da ich in der Iterierung mich bereits befinde, gebe ich den selbigen Path als Key ein.
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
  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 15;
  }

  isColliding(obj) {
    return (
      this.X + this.width >= obj.X &&
      this.X <= obj.X + obj.width &&
      this.Y + this.offsetY + this.height >= obj.Y &&
      this.Y + this.offsetY <= obj.Y + obj.height &&
      obj.onCollisionCourse
      // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir.
      // Nützlich bei Gegenständen, auf denen man stehen kann.
    );
  }
}
