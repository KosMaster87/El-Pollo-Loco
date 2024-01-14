"use strict";

class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

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
}
