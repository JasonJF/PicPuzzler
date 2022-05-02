//gameLogic.js
//This file contains all the game logic functions
import isSolvable from "./solver";
import isEqual from "lodash/isEqual";
import { indexOf } from "lodash";

let gameBoardInitial = [];
let gameBoardCurrent = [];

//Initialization
function initializeBoard() {
  console.log("Initializing Board...");
  //create a shuffled array
  // shuffleBoard();
  // gameBoardCurrent = [...gameBoardInitial];
  gameBoardCurrent = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  redrawBoard(gameBoardCurrent);
  shuffleBoard();
  setImageTiles();
}
//Load default tile positions
const defaultPositions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

async function shuffleArray(array) {
  let solvable = false;
  let shuffledPositions = [];

  while (!solvable) {
    shuffledPositions = [...array];

    for (let i = 0; i < array.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPositions[i], shuffledPositions[j]] = [
        shuffledPositions[j],
        shuffledPositions[i],
      ];
    }
    solvable = isSolvable(shuffledPositions);
  }
  return shuffledPositions;
}

//Set images on tiles
function setImageTiles() {
  const positionArray = Object.keys(position);
  var imageObj = new Image();
  // imageObj.src = "images/colourful_puppy.jpg";
  imageObj.src =
    "https://cdn.pixabay.com/photo/2018/07/01/00/59/dog-3508706_1280.jpg";
  // imageObj.src = "https://cdn.pixabay.com/photo/2021/11/17/11/02/flowers-6803234_1280.png";
  imageObj.onload = function () {
    //variables to determine which block to draw in
    let x = 0;
    let y = 0;

    for (let i = 0; i < positionArray.length; i++) {
      // console.log(positionArray[i]);

      //increment x, y
      if (x >= 3) {
        x = 0;
        y++;
      }

      //load image to canvas
      // let canvas = $(`.${positionArray[i]}`)[0];
      // let canvas = document.getElementById(i + 1);
      let canvas = document.getElementById(i + 1);
      let context = canvas.getContext("2d");
      let imgWidth = imageObj.naturalWidth;
      let imageHeight = imageObj.naturalHeight;

      // draw cropped image
      var sourceX = x * (imgWidth / 3);
      var sourceY = y * (imageHeight / 3);
      var sourceWidth = imgWidth / 3;
      var sourceHeight = imageHeight / 3;
      var destWidth = canvas.width;
      var destHeight = canvas.height;
      var destX = 0;
      var destY = 0;
      context.drawImage(
        imageObj,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        destX,
        destY,
        destWidth,
        destHeight
      );

      x++;
    }
    //set canvas id=9to blankTile
    // setBlankTile(9);
  };
}
function setBlankTile(tileId) {
  let blankTile = document.getElementById(tileId);
  blankTile.classList.add("blankTile");
}
async function shuffleBoard() {
  gameBoardInitial = await shuffleArray(defaultPositions);
  gameBoardCurrent = [...gameBoardInitial];
  redrawBoard(gameBoardInitial);
}

//default position classes
const position = {
  p1: ["p2", "p4"],
  p2: ["p1", "p3", "p5"],
  p3: ["p2", "p6"],
  p4: ["p1", "p5", "p7"],
  p5: ["p2", "p4", "p6", "p8"],
  p6: ["p3", "p5", "p9"],
  p7: ["p4", "p8"],
  p8: ["p5", "p7", "p9"],
  p9: ["p6", "p8"],
};

//handleTileClick
function handleTileClick(e) {
  let tileMoved = false;
  let clickedTile = e.currentTarget.getAttribute("class");
  // console.log(e.target);
  let clickedClass = e.target.getAttribute("class");
  // console.log(clickedClass);
  //strip away the tile class
  let trimClass = clickedClass.replace("tile ", "");
  // console.log(trimClass);
  //check adjacent tiles for blanks
  let adjTiles = position[trimClass];
  adjTiles.forEach((adjTile) => {
    // console.log(adjTile);

    if ($("." + adjTile).hasClass("blankTile")) {
      let emptyTile = $("." + adjTile);
      let tile = $("." + trimClass);
      // console.log(adjTile + " is blank.");
      //move the tile
      moveTile_2(tile, emptyTile);
      tileMoved = true;
      // moveTile(tile, emptyTile);
    }
  });
  return tileMoved;
}

//handle tile movement
function moveTile(tile, emptyTile) {
  let tileClass = tile.attr("class").replace("tile ", "");
  let emptyClass = emptyTile.attr("class").match(/\w\d/)[0];

  // //swap classes
  tile.removeClass(tileClass);
  emptyTile.removeClass(emptyClass);

  tile.addClass(emptyClass);
  emptyTile.addClass(tileClass);
}
function moveTile_2(tile, emptyTile) {
  // console.log(gameBoardInitial);

  if (gameBoardCurrent.length == 0) {
    gameBoardCurrent = [...gameBoardInitial];
  }
  // console.log(gameBoardCurrent);
  let tileToMove = tile.attr("id").match(/\d/)[0];
  let blankTile = emptyTile.attr("id").match(/\d/)[0];

  //get index of tiles
  let tile1Index = gameBoardCurrent.indexOf(parseInt(tileToMove));
  let tile2Index = gameBoardCurrent.indexOf(parseInt(blankTile));
  //swap tiles
  gameBoardCurrent[tile1Index] = parseInt(blankTile);
  gameBoardCurrent[tile2Index] = parseInt(tileToMove);

  redrawBoard(gameBoardCurrent);

  //check if completed
  checkIfComplete();
  // getCurrentBoardState();
}

function redrawBoard(newTilePositions) {
  for (let i = 0; i < newTilePositions.length; i++) {
    let tile = document.getElementById(i + 1);
    let newPosition = newTilePositions.indexOf(i + 1) + 1;
    tile.setAttribute("class", "tile " + "p" + newPosition);
    // tile.setAttribute("class", "tile " + defaultPositions[i]);
  }
  //set canvas id=9 to blankTile
  // let blankTile = document.getElementById(8);
  // blankTile.classList.add("blankTile");

  setBlankTile(9);
}

function getCurrentBoardState() {
  console.log("This is the current board state:");
  isSolvable(gameBoardCurrent);
  console.log(gameBoardCurrent);
}

function resetBoard() {
  gameBoardCurrent = [...gameBoardInitial];
  redrawBoard(gameBoardInitial);
}

function checkIfComplete() {
  if (isEqual(gameBoardCurrent, defaultPositions)) {
    console.log("You Won!");
    let blankTile = document.getElementById(9);
    blankTile.classList.remove("blankTile");
    return true;
  } else {
    return false;
  }
}

export {
  handleTileClick,
  initializeBoard,
  getCurrentBoardState,
  resetBoard,
  checkIfComplete,
};
