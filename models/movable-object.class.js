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
   *
   * @param {Load image for any movable caracter.} path
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Diese Funktion wird in der "character.class.js durch super() gestartet."
   * @param {Array image summary} array ["img/img1.png", ...]
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image(); // Objekt erstellen
      img.src = path; // Path erstellen (nicht der dazugehörige Key.)
      this.imageCache[path] = img; // [path] ist der Individuelle Key für jedes des Bildel. Da ich in der Iterierung mich bereits befinde, gebe ich den Path als Key ein.
    });
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 & 6; => 1, Rest 1
    let path = this.images[i];

    // let path = this.IMAGES_WALKING[this.currentImage]; // Nun den Key die in der loadImages(array) mit "this.imageCache[path] = path;"" im dem "new Image()" als ein Objekt hinterlegt wurde, auslesen und wiederrum in der "animate()" Funktion im der Variable speichern.
    this.img = this.imageCache[path]; // Die Globale "img" Variable soll nun mit dem etsprechendem Bild aus dem imageCahe Pfad befüllt werden.
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
