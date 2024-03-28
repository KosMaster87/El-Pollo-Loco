"use strict";

class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0; // Geschwindigkeit nach unten.
  acceleration = 1; // Beschleunigung
  energy = 100;
  lastHit = 0;

  /**
   * Die Schwerkraft für den Charakter und die Flaschen definieren.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        // Das mit größer als 0 muss sein, da die Sprung fn nur über dem Boden fn.
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 26);
  }

  /**
   *
   * @returns Throwable object should always fall.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 260;
    }
  }

  /**
   * The full value of an array with the images is iterated here,
   * and a variable with the path of the images selected for playback is declared here.
   *
   * Der Vollwert eines Arrays mit den Bilder wird hier Iterriert,
   * und eine Variable mit den Pfad der Bilder die zum Abspielen gewählt wurden,
   * wird hier geklariert.
   *
   * Das heisst, die im vorab geladenen "loadImages(array)",
   * werden hier einzelt für die Bewegung zwischengespeichert.
   * @param {Array with images} images
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   *
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Bewegt z.B. die Wolken und die Hühner.
   * Der this.speed wird in dem jeweiligem Objekt definiert.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Nur für den Peppe, um seine beschleunigung zum Springen zu steuern.
   */
  jump() {
    this.speedY = 15;
  }

  /**
   * Der zugefügte Schaden, an Pepe in einer bestimmten Zeitspanne. (Siehe: this.lastHit)
   * @returns Boolean
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Zugefügter Schaden am Charakter in der Statusleiste.
   */
  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Pepes sein sterben.
   * @returns
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Berechnung des Bereiches für das jeweiliege Objekt.
   */
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
  //           obj.onCollisionCourse;
  // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt.
  // Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
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

  /**
   * Mit offset hat man eine Feineinstellung des bereiches, wo die Objekte in Berührung kommen.
   */
  //   offset = {
  //     'top': -5,
  //     'bottom': 0,
  //     'left': -10,
  //     'right': -10
  // };
}
