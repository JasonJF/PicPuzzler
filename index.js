//default position classes
const position = {
    "a": ["b","d"],
    "b": ["a","c","e"],
    "c": ["b","f"],
    "d": ["a","e","g"],
    "e": ["b","d","f","g"],
    "f": ["c","e","i"],
    "g": ["d","h"],
    "h": ["e","g","i"],
    "i": ["f","h"]
}

//add event listener to tiles
$(".tile").on("click", function() {

    //get class of clicked tile
    let myClass = $( this ).attr("class");
    //strip away the tile class
    let trimClass = myClass.replace("tile ", "");
    // console.log(trimClass);

    //check adjacent tiles for blanks
    let adjTiles = position[trimClass];
    adjTiles.forEach(adjTile => {
        // console.log(adjTile);
        if($("." + adjTile).hasClass("blankTile")){
            console.log(adjTile + " is blank.")
        }
    });
});