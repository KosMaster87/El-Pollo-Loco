"use strict";

class Character extends MovableObject {
  height = 150;
  width = 85;
  x = 0;
  // x = 80;
  y = 150;
  speed = 5;
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

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  constructor() {
    /**
     * Load image from movable-object.class.js
     */
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");

    /**
     * Das super() startet auch diese fn.
     * this. ist der Initiator für diesen Karakter. Die loadImages() wird dann in der Eltern Klasse "drawable-object.class.js weiter ausgeführt."
     */
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  /**
   * 
   */
  animate() {
    /**
     * Speed optionts
     * Running direction
     */
    setInterval(() => {
      this.walking_sound.pause();

      // Weill ich aus der "world" dem "Character" den zugrif gewährt habe,
      // kann ich nun mit "this.world" innerhalb des "Characters" arbeiten.
      // das "level" ist im "Level" definiert.
      // ..end_x damit Pepe nach rechts nicht die Leinwand verlassen kann.
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) { 
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > -500) { // -500 Weill Pepe nicht aus der Leinwand, nach links, laufen soll.
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }

      this.world.camera_x = -this.x + 100; // Die Kamera an den Karackter gebunden, sodass die "world" sich mitbewegt. Pepe startet auch bei 100px weiter rechts.
    }, 1000 / 60);

    setInterval(() => {
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 1000 / 7);
  }
}
