const BaseAssets = require("./assets");

class Controls extends BaseAssets {
  moveSkier() {
    /*
     * This function is responsible for the x and y axis position of
     * the skier. It actually moves the skier on the canvas
     */
    switch (this.skierDirection) {
      case 2:
        this.skierMapX -= Math.round(this.skierSpeed / 1.4142);
        this.skierMapY += Math.round(this.skierSpeed / 1.4142);
        this.placeNewObstacle(this.skierDirection);
        break;
      case 3:
        this.skierMapY += this.skierSpeed;
        this.placeNewObstacle(this.skierDirection);
        break;
      case 4:
        this.skierMapX += this.skierSpeed / 1.4142;
        this.skierMapY += this.skierSpeed / 1.4142;
        this.placeNewObstacle(this.skierDirection);
        break;
    }
  }

  getSkierAsset() {
    /*
     * This function draws skier image depending on the position
     * the skier is. if the skier is moving right, the skierRight image
     * will load up. if the skier crashes, the crash image will load up
     */
    let skierAssetName;
    switch (this.skierDirection) {
      case 0:
        skierAssetName = "skierCrash";
        break;
      case 1:
        skierAssetName = "skierLeft";
        break;
      case 2:
        skierAssetName = "skierLeftDown";
        break;
      case 3:
        skierAssetName = "skierDown";
        break;
      case 4:
        skierAssetName = "skierRightDown";
        break;
      case 5:
        skierAssetName = "skierRight";
        break;
    }

    return skierAssetName;
  }

  drawSkier() {
    /*
     * This function redraws the skier on the canvas depending on
     * the x and y cordinates
     */
    let skierAssetName = this.getSkierAsset();
    let skierImage = this.loadedAssets[skierAssetName];
    let x = (this.gameWidth - skierImage.width) / 2;
    let y = (this.gameHeight - skierImage.height) / 2;

    this.ctx.drawImage(skierImage, x, y, skierImage.width, skierImage.height);
  }

  intersectRect(r1, r2) {
    /*
     This function takes two  parameters and intersect Rect
     @param {object} r1 
     @param {object} r2 
    */
    return !(
      r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top
    );
  }

  checkIfSkierHitObstacle() {
    /*
     This function constantly checks if the skier
     has  hit an object. if there is a collision, it will
     load the skier crash icon, pause the game and also increments Hit count by one
    */
    let skierAssetName = this.getSkierAsset();
    let skierImage = this.loadedAssets[skierAssetName];
    if (skierImage == undefined) {
      return;
    }

    let skierRect = {
      left: this.skierMapX + this.gameWidth / 2,
      right: this.skierMapX + skierImage.width + this.gameWidth / 2,
      top: this.skierMapY + skierImage.height - 5 + this.gameHeight / 2,
      bottom: this.skierMapY + skierImage.height + this.gameHeight / 2
    };

    let collision = this.obstacles.find(obstacle => {
      let obstacleImage = this.loadedAssets[obstacle.type];
      let obstacleRect = {
        left: obstacle.x,
        right: obstacle.x + obstacleImage.width,
        top: obstacle.y + obstacleImage.height - 5,
        bottom: obstacle.y + obstacleImage.height
      };

      return this.intersectRect(skierRect, obstacleRect);
    });

    if (collision) {
      this.skierDirection != 0 ? (this.hits += 1) : null;
      this.skierDirection = 0;
    }
  }

  setupKeyhandler(jquery) {
    /*
     This function initializes all the keys arrows to be used to play that game.
     Key arrows such as Left, Right, Up , Down and Space Bar to Pause the Game
    */
    jquery.keydown(event => {
      if (this.initialStart === false) return;
      switch (event.which) {
        case 37: // left
          if (this.skierDirection === 1) {
            this.skierMapX -= this.skierSpeed;
            this.placeNewObstacle(this.skierDirection);
          } else {
            this.skierDirection > 0 ? this.skierDirection-- : null;
          }
          event.preventDefault();
          break;
        case 39: // right
          if (this.skierDirection === 5) {
            this.skierMapX += this.skierSpeed;
            this.placeNewObstacle(this.skierDirection);
          } else {
            this.skierDirection++;
          }
          event.preventDefault();
          break;
        case 38: // up
          if (this.skierDirection === 1 || this.skierDirection === 5) {
            this.skierMapY -= this.skierSpeed;
            this.placeNewObstacle(6);
          }
          event.preventDefault();
          break;
        case 40: // down
          this.skierDirection = 3;
          event.preventDefault();
          break;
        case 32: // pause
          this.skierDirection = 1;
          this.paused === false ? (this.paused = true) : (this.paused = false);
          event.preventDefault();
          break;
      }
    });

    //setting up automatic moving of skier after start button is clicked
    $("#startGameBtn").click(() => {
      $("#startGame").modal("hide");
      setTimeout(() => {
        this.skierDirection = 3;
        $("#loading").html("");
        this.initialStart = true;
      }, 2000);
    });
  }

  drawObstacles() {
    /*
     This function is reposible for drawing the obstacles which the
     skier will encounter. These obstacles are trees, rocks, etc
    */
    let newObstacles = [];
    this.obstacles.map(obstacle => {
      let obstacleImage = this.loadedAssets[obstacle.type];
      let x = obstacle.x - this.skierMapX - obstacleImage.width / 2;
      let y = obstacle.y - this.skierMapY - obstacleImage.height / 2;
      if (
        x < -100 ||
        x > this.gameWidth + 50 ||
        y < -100 ||
        y > this.gameHeight + 50
      ) {
        return;
      }

      this.ctx.drawImage(
        obstacleImage,
        x,
        y,
        obstacleImage.width,
        obstacleImage.height
      );
      newObstacles.push(obstacle);
    });
    this.obstacles = newObstacles;
  }

  placeInitialObstacles() {
    /*
     This function is only called once . it places initial
     Obstacles in the game
    */
    let numberObstacles = Math.ceil(
      Math.random(5, 7) * (this.gameWidth / 800) * (this.gameHeight / 500)
    );

    let minX = -50;
    let maxX = this.gameWidth + 50;
    let minY = this.gameHeight / 2 + 100;
    let maxY = this.gameHeight + 50;

    for (let i = 0; i < numberObstacles; i++) {
      this.placeRandomObstacle(minX, maxX, minY, maxY);
    }

    this.obstacles = this.obstacles.sort(obstacle => {
      let obstacleImage = this.loadedAssets[obstacle.type];
      return obstacle.y + obstacleImage.height;
    });
  }

  placeNewObstacle(direction) {
    /*
     This function places new obstacles to the skier depending
     on the skier direction. It takes direction as a parameter
     @param {number} skierDirection 
    */
    let shouldPlaceObstacle = this.randomInt(1, 8);
    if (shouldPlaceObstacle !== 8) {
      return;
    }

    let leftEdge = this.skierMapX;
    let rightEdge = this.skierMapX + this.gameWidth;
    let topEdge = this.skierMapY;
    let bottomEdge = this.skierMapY + this.gameHeight;

    switch (direction) {
      case 1: // left
        this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
        break;
      case 2: // left down
        this.placeRandomObstacle(leftEdge - 50, leftEdge, topEdge, bottomEdge);
        this.placeRandomObstacle(
          leftEdge,
          rightEdge,
          bottomEdge,
          bottomEdge + 50
        );
        break;
      case 3: // down
        this.placeRandomObstacle(
          leftEdge,
          rightEdge,
          bottomEdge,
          bottomEdge + 50
        );
        break;
      case 4: // right down
        this.placeRandomObstacle(
          rightEdge,
          rightEdge + 50,
          topEdge,
          bottomEdge
        );
        this.placeRandomObstacle(
          leftEdge,
          rightEdge,
          bottomEdge,
          bottomEdge + 50
        );
        break;
      case 5: // right
        this.placeRandomObstacle(
          rightEdge,
          rightEdge + 50,
          topEdge,
          bottomEdge
        );
        break;
      case 6: // up
        this.placeRandomObstacle(leftEdge, rightEdge, topEdge - 50, topEdge);
        break;
    }
  }

  placeRandomObstacle(minX, maxX, minY, maxY) {
    /*
     This function is reponsible for generating random obstacles for
     the skier
     @param {number} minX 
     @param {number} maxX 
     @param {number} minY 
     @param {number} maxY 
    */
    let obstacleIndex = this.randomInt(0, this.obstacleTypes.length - 1);
    let position = this.calculateOpenPosition(minX, maxX, minY, maxY);
    this.obstacles.push({
      type: this.obstacleTypes[obstacleIndex],
      x: position.x,
      y: position.y
    });
  }

  calculateOpenPosition(minX, maxX, minY, maxY) {
    /*
     This function calculate open position to determine if a
     collision has been found or not. it return true or false
     @param {number} minX 
     @param {number} maxX 
     @param {number} minY 
     @param {number} maxY 
    */
    let x = this.randomInt(minX, maxX);
    let y = this.randomInt(minY, maxY);
    let foundCollision = this.obstacles.find(obstacle => {
      return (
        x > obstacle.x - 50 &&
        x < obstacle.x + 50 &&
        y > obstacle.y - 50 &&
        y < obstacle.y + 50
      );
    });

    if (foundCollision) {
      return this.calculateOpenPosition(minX, maxX, minY, maxY);
    } else {
      return {
        x: x,
        y: y
      };
    }
  }
  /*
     This function generate random integer value 
     @param {number} min 
     @param {number} max 
    */
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
module.exports = Controls;
