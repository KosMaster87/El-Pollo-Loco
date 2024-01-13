"use strict";

let canvas;
let world;
let keyboard = new Keyboard();

/**
 * new World loud the canvas in world.class.ja
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // console.log("My Character is", world.character);
  // console.log("My Character is", world.enemies);
}
