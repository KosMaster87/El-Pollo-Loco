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

  /**{#cf9a4b}
   * Für die Tastatur steuerung, den Karakter und die Welt zusammen verbinden .
   * Der Karakter kann die Variablen der Welt nun nutzen.
   * Hier wird eine Beziehung zwischen dem "Character" und der "World" Klasse hergestellt.
   * Die Variable "world" muss dem "charavter.class.js" hinzugefügt werden.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * !!!!!!!!!!!!!!!!!!!!!
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

  /**{#48bbc4, 27}
   * Draw() wird immer wieder aufgerufen.
   * Draw what ever in this.World
   */
  draw() {
    // clearRect => Die Canvas Reseten.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0); // Die Welt verschieben.
    this.addObjectsToMap(this.level.background); // Den Hintergrund des Spiels zuerst einfügen.

    this.ctx.translate(-this.camera_x, 0);

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

  /**{#1f233b, 50}
   * Adds any objects with specific attributes.
   * @param {The objects in this world.} objects
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Die if Abfragen handhaben den Charakter, seinen Spiegelbild.
   * Sowie die Gespiegelte Koardinaten des Canvas für den Charakter.
   * Add to Canvas Board each things.
   * @param {movable object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    // Die Bedingung muss sein um die Richtung abzubrechen.
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Die Flips sind zum Spiegeln der Bilder.
   * @param {movable-object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Die Flips sind zum Spiegeln der Bilder.
   * @param {movable-object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
