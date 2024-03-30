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
   * Für die Tastatur steuerung, den Karakter und die Welt zusammen verbinden .
   * Der Karakter kann die Variablen der Welt nun nutzen.
   * Hier wird eine Beziehung zwischen dem "Character" und der "World" Klasse hergestellt.
   * Die Variable "world" muss dem "charavter.class.js" hinzugefügt werden.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Prüft die Zeitvorgabe für Kolusion von Pepe mit den Feinden.
   * Sowie auch die Berührung der Flaschen.
   */
  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObject();
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
  checkThrowObject() {
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
   * ACHTUNG: Es ist nicht das Selbe "draw()"  wie es in der class DrawableObject definiert ist.
   */
  draw() {
    // clearRect => Die Canvas Reseten.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /**
     * Den Hintergrung zu den Bewegbaren Objekten in der X-Achse anpassen.
     */
    this.ctx.translate(this.camera_x, 0); // Die Welt verschieben. Der zweite Argument ist die Y-Achse, die nicht verschoben werden soll.
    this.addObjectsToMap(this.level.background);

    /**
     * Funktionen für nicht gebewegbare Zeichenbare Objekte.
     */
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    /**
     * Funktionen für bewegbare Zeichenbare Objekte.
     */
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    /**
     * this.draw() fps aktion.
    */
    self = this;
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
   * Die if Abfragen handhaben den Charakter, seinen Spiegelbild.
   * Sowie die Gespiegelte Koardinaten des Canvas für den Charakter.
   * Add to Canvas Board each things.
   * @param {movable object} mo
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      // nach rechts = true; Weiter mit "flipImage".
      this.flipImage(mo);
    }

    mo.draw(this.ctx); // Weiter in der drawable-object.class.js.
    mo.drawFrame(this.ctx); // Weiter in der drawable-object.class.js. // Die auserlesenen Objekte eine Umrandung.

    // Die Bedingung muss sein um die Richtung abzubrechen.
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Die "Flips" sind zum Spiegeln der Bilder.
   * Den von rechts-nach-links zustand setzen.
   * @param {movable-object} mo
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); // Die Verschiebung um die eigene Y-Achse.
    this.ctx.scale(-1, 1); // Die Spieglung mit "-1" in der X-Achse. Die Y-Achse bleibt unverändert mit "1".
    mo.x = mo.x * -1; // Das Koardinatensystem zu dem Bild muss auch noch gespiegelt werden.
  }

  /**
   * Die "Flips" sind zum Spiegeln der Bilder.
   * Den von-links-nach-rechts zustand setzen.
   * @param {movable-object} mo
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1; // Das Koardinatensystem zu dem Bild muss auch noch gespiegelt werden.
    this.ctx.restore();
  }
}
