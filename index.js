//load image to canvas
var canvas = $(".p1")[0];
var context = canvas.getContext('2d');
var imageObj = new Image();

imageObj.onload = function () {
    // draw cropped image
    var sourceX = 0;
    var sourceY = 0;
    var sourceWidth = 150;
    var sourceHeight = 150;
    var destWidth = canvas.width;
    var destHeight = canvas.height;
    var destX = 0;
    var destY = 0;
    context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
};
// imageObj.src = "images/colourful_puppy.jpg";
// imageObj.src = "https://cdn.pixabay.com/photo/2018/07/01/00/59/dog-3508706_1280.jpg";
imageObj.src = "https://cdn.pixabay.com/photo/2021/11/17/11/02/flowers-6803234_1280.png";


//default position classes
const position = {
    "p0": ["p1", "p3"],
    "p1": ["p0", "p2", "p4"],
    "p2": ["p1", "p5"],
    "p3": ["p0", "p4", "p6"],
    "p4": ["p1", "p3", "p5", "p7"],
    "p5": ["p2", "p4", "p8"],
    "p6": ["p3", "p7"],
    "p7": ["p4", "p6", "p8"],
    "p8": ["p5", "p7"]
}

//add event listener to tiles
$(".tile").on("click", function () {

    let clickedTile = $(this);
    //get class of clicked tile
    let myClass = $(this).attr("class");
    //strip away the tile class
    let trimClass = myClass.replace("tile ", "");
    // console.log(trimClass);

    //check adjacent tiles for blanks
    let adjTiles = position[trimClass];
    adjTiles.forEach(adjTile => {
        // console.log(adjTile);

        if ($("." + adjTile).hasClass("blankTile")) {
            emptyTile = $("." + adjTile);
            // console.log(adjTile + " is blank.")
            //move the tile
            moveTile(clickedTile, emptyTile);
        }
    });
});

//move the tile
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