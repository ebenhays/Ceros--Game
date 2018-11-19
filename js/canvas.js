const BaseAssets = require("./assets");
class Canvas extends BaseAssets {
  prepareGameCanvas() {
    /*
     * This function prepares the width and height of Canvas.
     */
    this.gameWidth = window.innerWidth;
    this.gameHeight = window.innerHeight;
    this.canvas = $("<canvas ></canvas>")
      .attr("width", this.gameWidth * window.devicePixelRatio)
      .attr("height", this.gameHeight * window.devicePixelRatio)
      .css({ width: this.gameWidth + "px", height: this.gameHeight + "px" });
    $("body").append(this.canvas);
    this.ctx = this.canvas[0].getContext("2d");
  }

  clearGameCanvas() {
    /*
     * This function is responsible for clearing the main canvas
     */
    this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
  }
}
module.exports = Canvas;
