function isSolvable(boardToSolve) {
  //   console.log(gameBoard);
  const numberOfInversions = countInversions(boardToSolve);
  return numberOfInversions % 2 === 0;
}

function countInversions(boardToSolve) {
  let inversions = [];
  boardToSolve.forEach((element, index) => {
    // console.log(element + " " + index);
    for (let i = index + 1; i < boardToSolve.length; i++) {
      let nextDigit = boardToSolve[i];
      if (element == 9 || nextDigit == 9) {
        // console.log("skip");
      } else {
        if (element > boardToSolve[i]) {
          inversions.push(element + "-" + boardToSolve[i]);
        }
      }
    }
  });
  console.log(inversions);
  console.log(inversions.length);
  return inversions.length;
}

export default isSolvable;
