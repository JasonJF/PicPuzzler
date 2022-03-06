//gameLogic.js
//This file contains all the game logic functions

//handleTileClick
function handleTileClick(e) {
  console.log(e.target);
}

//handle tile movement
function moveTile(tile, emptyTile) {
  // let regex = \w\d;
  let tileId = tile[0].id;
  let tileClass = tile.attr("class").replace("tile ", "");
  let emptyId = emptyTile[0].id;
  let emptyClass = emptyTile.attr("class").match(/\w\d/);
  //
  console.log(tileId);
  console.log(tileClass);
  console.log(emptyId);
  console.log(emptyClass);

  //swap classes
  tile.removeClass(tileClass);
  emptyTile.removeClass(emptyClass);

  tile.addClass(emptyClass);
  emptyTile.addClass(tileClass);
}

export default handleTileClick;
