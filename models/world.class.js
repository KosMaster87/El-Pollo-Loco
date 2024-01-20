"use strict";

class World {
  level = level1;
  statusBar = new StatusBar();
  character = new Character();
  throwableObjects = [];
  // throwableObjects = [new ThrowableObject()];
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
    this.run();
  }

  /**
   * Den Karakter und die Welt zusammen verbinden für die Tastatur steuerung.
   * Der Karakter kann die Variablen der Welt nun nutzen.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   *
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkTrowObject();
    }, 200);
  }

  /**
   * Just check if character collision with chicken.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  /**
   * Flasche Werfen
   */
  checkTrowObject() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
    }
  }

  /**
   * Draw() wird immer wieder aufgerufen.
   * Draw what ever in this.World
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // world.character.x = 300 => Zum testen ob clear Funktionier.

    this.ctx.translate(this.camera_x, 0); // Die Welt verschieben.
    this.addObjectsToMap(this.level.background);

    this.ctx.translate(-this.camera_x, 0);
    // --Space for fixed objects --
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);

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
   * Add to Canvas Board each things.
   * @param {movable object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    /**
     * TODO *******  export to movable-object.class.js
     */
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * TODO *******  export to movable-object.class.js
   * @param {movable-object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * @param {movable-object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
