"use strict";

class Character extends MovableObject {
  speed = 1;
  world; // Der Karakter kann nun auf die Variablen aus der Welt zugreifen.
  walking_sound = new Audio("audio/walkingCharacter.mp3");
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  constructor() {
    /**
     * Load image from movable-object.class.js
     */
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    /**
     * this. ist der Initiator für diesen Karakter. Die loadImages() wird dann in der Eltern Klasse "movable-object.class.js weiter ausgeführt."
     */
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    /**
     * Speed optionts
     * Running direction
     */
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > -500) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;
    });

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // Walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 7);
  }

  // jump() {}
}
