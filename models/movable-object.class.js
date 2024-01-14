"use strict";

class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 1;
  energy = 100;
  lastHit = 0;

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

  playAnimation(images) {
    let i = this.currentImage % images.length; // let i = 7 & 6; => 1, Rest 1
    let path = images[i];
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

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isColliding(obj) {
    return (
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x + obj.width &&
      this.y < obj.y + obj.height
    );
  }

  //  MODUL 11 - El Pollo Loco Teil: 10 - Collision detection VIDEO
  //   // Bessere Formel zur Kollisionsberechnung (Genauer)
  // isColliding (obj) {
  //   return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) &&
  //           (this.Y + this.offsetY + this.height) >= obj.Y &&
  //           (this.Y + this.offsetY) <= (obj.Y + obj.height) &&
  //           obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

  // }

  // Marian
  // isColliding(obj) {
  //   return (
  //     this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
  //     this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
  //     this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
  //     this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
  //   );
  // }
}
