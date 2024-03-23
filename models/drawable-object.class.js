"use strict";

class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * Load image for any movable character.
   * @param {The path of the image to be loaded} path
   */
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElemnetById("image") <img id="image" src="..">
    this.img.src = path; // Hier dann die source für das Bild vom dem Pfad ableiten. Also
  }

  /**
   * Import from world.class.js
   * Hier werden die zu Zeichnenden Bilder auf die Canvas gezeichnet.
   * ACHTUNG: Es ist nicht das Selbe "draw()" wie es in der class World dedfiniert ist. 
   * @param {each movable object} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // this entfählt, da der Parameter das this.object selber ist.
  }

  /**
   * Import from world.class.js
   * "InstanceOf" bedeutet, dass nur die in der if Bediengung markierten Objekte die Umrandung bekommen.
   * Und das nur für die drawable-object.class.js, da hier auch mit "this" bezeichnet ist.
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
   * Wird bei den Charakteren und bewegten Objekten durch super() gestartet."
   * @param {Array image summary} array
   */
  loadImages(array) {
    array.forEach((path) => {
      let img = new Image(); // Image erstellen. Dann,
      img.src = path; // die source zuweisen.
      this.imageCache[path] = img;
      // Das Image mit seinem zugewiesenem source in das Array pushen.
      // Der [path] ist der Schlüssel im Array des jeweiligen Bildes.
    });
  }
}
