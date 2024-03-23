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

  // console.log(world.character);
  // console.log(world.enemies);
}
