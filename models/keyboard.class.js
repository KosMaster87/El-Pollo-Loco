"use strict";

class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  THROW = false; // Taste D
  COMMAND = false;
  AUDIO = false;
  RESTART = false;

  constructor() {
    window.addEventListener("keydown", (e) => {
      console.log(e.keyCode);
      
      if (e.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (e.keyCode == 38) {
        keyboard.UP = true;
      }
      if (e.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (e.keyCode == 68) {
        keyboard.THROW = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (e.keyCode == 38) {
        keyboard.UP = false;
      }
      if (e.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (e.keyCode == 68) {
        keyboard.THROW = false;
      }
    });
  }
}
