//gameLogic.js
//This file contains all the game logic functions

//default position classes
const position = {
  p0: ["p1", "p3"],
  p1: ["p0", "p2", "p4"],
  p2: ["p1", "p5"],
  p3: ["p0", "p4", "p6"],
  p4: ["p1", "p3", "p5", "p7"],
  p5: ["p2", "p4", "p8"],
  p6: ["p3", "p7"],
  p7: ["p4", "p6", "p8"],
  p8: ["p5", "p7"],
};

//handleTileClick
function handleTileClick(e) {
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
      moveTile(tile, emptyTile);
    }
  });
}

//handle tile movement
function moveTile(tile, emptyTile) {
  // console.log(tile);
  // // let regex = \w\d;
  // let tileId = tile[0].id;
  let tileClass = tile.attr("class").replace("tile ", "");
  // let emptyId = emptyTile[0].id;
  let emptyClass = emptyTile.attr("class").match(/\w\d/)[0];
  // //
  // console.log(tileId);
  // console.log(tileClass);
  // console.log(emptyId);
  // console.log(emptyClass);

  // //swap classes
  tile.removeClass(tileClass);
  emptyTile.removeClass(emptyClass);

  tile.addClass(emptyClass);
  emptyTile.addClass(tileClass);
}

export default handleTileClick;
