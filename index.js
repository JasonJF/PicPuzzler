//function to load images onto game tiles

function setImageTiles() {
    const positionArray = Object.keys(position);
    var imageObj = new Image();
    // imageObj.src = "images/colourful_puppy.jpg";
    imageObj.src = "https://cdn.pixabay.com/photo/2018/07/01/00/59/dog-3508706_1280.jpg";
    // imageObj.src = "https://cdn.pixabay.com/photo/2021/11/17/11/02/flowers-6803234_1280.png";
    imageObj.onload = function () {

        //variables to determine which block to draw in
        let x = 0;
        let y = 0;

        for (let i = 0; i < positionArray.length; i++) {
            console.log(positionArray[i]);

            //increment x, y
            if (x >= 3) {
                x = 0;
                y++;
            }

            //load image to canvas
            // let canvas = $(`.${positionArray[i]}`)[0];
            let canvas = document.getElementById(i);
            let context = canvas.getContext('2d');
            let imgWidth = imageObj.naturalWidth;
            let imageHeight = imageObj.naturalHeight;



            // draw cropped image
            var sourceX = x * (imgWidth / 3);
            var sourceY = y * (imageHeight / 3);
            var sourceWidth = (imgWidth / 3);
            var sourceHeight = (imageHeight / 3);
            var destWidth = canvas.width;
            var destHeight = canvas.height;
            var destX = 0;
            var destY = 0;
            context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

            x++
        }
        shuffleBoard();
    };
}








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

const defaultPositions = ["blankTile","p0","p1","p2","p3","p4","p5","p6","p7","p8"];

//set images on tiles

let shuffledArray = shuffleArray(defaultPositions);
// createCanvasTiles();
setImageTiles();


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

//shuffle array
function shuffleArray(array) {

    let shuffledPositions = [...array];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPositions[i], shuffledPositions[j]] = [shuffledPositions[j], shuffledPositions[i]];

    }
    return shuffledPositions;
    }

//create canvas elements
function createCanvasTiles() {

    let container = document.getElementsByClassName('tileContainer');
    // console.log(container);
    for(let i = 0; i < shuffledArray.length; i++) {
        let tile = document.createElement("canvas");
        tile.setAttribute('id', i);
        tile.setAttribute('class', "tile " + shuffledArray[i]);
        console.log(tile);
        container[0].appendChild(tile);
    }
}

function shuffleBoard() {
    for(let i = 0; i < shuffledArray.length - 1; i++) {
        let tile = document.getElementById(i);
        tile.setAttribute('class', "tile " + shuffledArray[i]);
    }
}