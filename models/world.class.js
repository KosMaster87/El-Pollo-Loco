"use strict";

class World {
  level = level01;
  character = new Character();

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  /**
   * First step to add the draw in this document.
   * @param {init in the game.js} canvas
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  /**
   * Den Karakter und die Welt zusammen verbinden für die Tastatur steuerung.
   * Der Karakter kann die Wariablen der Welt nun nutzen.
   */
  setWorld() {
    this.character.world = this;
  }
  /**
   * Draw() wird immer wieder aufgerufen
   * Draw what ever in this.World
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // world.character.x = 300 => Zum testen ob clear Funktionier.

    this.ctx.translate(this.camera_x, 0); // Die Welt verschieben.

    this.addObjectsToMap(this.level.background);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0); // Die Welt verschieben.

    self = this;

    /**
     * this.draw() fps aktion.
     */
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds any objects with specific attributes.
   * @param {The objects in this world.} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Die if Abfragen handhaben den Charakter, seinen Spiegelbild. Sowie die Gespiegelte Koardinaten des Canvas für den Charakter.
   * Add to Canvas Board each thins.
   * @param {movable object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);

    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
