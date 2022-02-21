document.addEventListener("DOMContentLoaded", () => {
  // Size of the rows and cols
  const ROWS = 6,
    COLS = 5;
  // Create the gmae board
  createTiles();

  let guessNums = [[]];
  let avilableSpace = 1;
  const keys = document.querySelectorAll(".keyboard-row button");
  let Num = getRandomNum();
  let guessNumCount = 0;

  // Get the current string num
  function getCurrentNumsArr() {
    const numberOfGuessNums = guessNums.length;
    return guessNums[numberOfGuessNums - 1];
  }

  // Update the array "guessNums" with the input from the keyboard
  function updateGuessNums(digit) {
    const currentNumsArr = getCurrentNumsArr();
    if (currentNumsArr && currentNumsArr.length < ROWS) {
      currentNumsArr.push(digit);
      const avilableSpaceEl = document.getElementById(String(avilableSpace));
      avilableSpace = avilableSpace + 1;
      avilableSpaceEl.textContent = digit;
      makeKeyDisbale(digit);
    }
  }

  // Return a new background-color to the tile
  function getTileColor(digit, index) {
    const isCorrectDigit = Num.includes(digit);
    if (!isCorrectDigit) {
      return "rgb(58, 58, 60)"; // return grey color.
    }
    const digitInThatPos = Num.charAt(index);
    const isCorrectPos = digit === digitInThatPos;
    if (isCorrectPos) {
      return "rgb(83, 141, 78)"; // return green color.
    }
    //return "rgb(181,159,59)"; // return orange color.
  }

  // Get the enterd string num and check it
  function handleSubmitNum() {
    const currentNumsArr = getCurrentNumsArr();
    if (currentNumsArr.length !== COLS) {
      window.alert(`Num must be ${COLS} digits`);
    }
    const currentNum = currentNumsArr.join("");
    const firstDigitId = guessNumCount * COLS + 1;
    const interval = 200;
    currentNumsArr.forEach((digit, index) => {
      setTimeout(() => {
        const tileColor = getTileColor(digit, index);
        const digitId = firstDigitId + index;
        const digitEl = document.getElementById(digitId);
        digitEl.classList.add("animate__flipInX");
        digitEl.style = `background-color: ${tileColor}; border-color:${tileColor}`;
        keys[digitInKeyIndex(digit)].style = `background-color: ${tileColor}`;
      }, interval * index);
    });
    guessNumCount++;
    if (currentNum === Num) {
      window.alert("You win 🥇");
      makeAllKeysDisbale();
    }
    if (guessNums.length === ROWS) {
      window.alert(`You lose 😔\nThe Num was ${Num}.`);
      makeAllKeysDisbale();
    }
    guessNums.push([]);
    makeAllKeysAvailable();
  }

  // Get the button Del
  function handleDelDigit() {
    const currentNumsArr = getCurrentNumsArr();
    currentNumsArr.pop();
    guessNums[guessNums.length - 1] = currentNumsArr;
    const lastDigitEl = document.getElementById(String(avilableSpace - 1));
    lastDigitEl.textContent = "";
    avilableSpace = avilableSpace - 1;
  }

  function digitInKeyIndex(digit) {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].getAttribute("data-key") === digit) {
        return i;
      }
    }
  }
  // Make the key disabled after the user click
  function makeKeyDisbale(digit) {
    index = digitInKeyIndex(digit);
    keys[index].className = "tile.incorrect-letter";
    keys[index].disabled = true;
  }

  function makeAllKeysDisbale() {
    for (let i = 0; i < keys.length; i++) {
      keys[i].className = "tile.incorrect-letter";
      keys[i].disabled = true;
    }
  }

  // Make the keyboard avilable after the user enterd
  function makeAllKeysAvailable() {
    for (let i = 0; i < keys.length; i++) {
      keys[i].style = "rgb(129, 131, 132)";
      keys[i].disabled = false;
    }
  }

  // Make the random string num and rturn it
  function getRandomNum() {
    let checkNum = [COLS];
    for (let i = 0; i < COLS; i++) {
      checkNum[i] = 0;
    }
    let rand;
    let answer = [];
    for (let index = 0; index < COLS; index++) {
      do {
        rand = Math.floor(Math.random() * COLS) + 1;
      } while (checkNum[rand - 1] != 0 && checkNum[rand - 1] < 2);
      checkNum[rand - 1]++;
      answer[index] = rand;
    }

    return answer.join("");
  }

  // Create the gmae board
  function createTiles() {
    const gameBoard = document.getElementById("board");
    for (let index = 0; index < COLS * ROWS; index++) {
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.classList.add("animate__animated");
      tile.setAttribute("id", index + 1);
      gameBoard.appendChild(tile);
    }
  }
  /*function clearBoard() {
    for (let i = 0; i < COLS * ROWS; i++) {
      let tile = document.getElementById(i + 1);
      tile.textContent = "";
    }
    const keys = document.getElementsByClassName("keyboard-button");

    for (var key of keys) {
      key.disabled = true;
    }
  }

  function getIndicesOfLetter(letter, arr) {
    const indices = [];
    let idx = arr.indexOf(letter);
    while (idx != -1) {
      indices.push(idx);
      idx = arr.indexOf(letter, idx + 1);
    }
    return indices;
  }
  function getTileClass(letter, index, currentWordArr) {
    const isCorrectLetter = currentWord
      .toUpperCase()
      .includes(letter.toUpperCase());
    if (!isCorrectLetter) {
      return "incorrect-letter";
    }*/
  // Put on the buttons the methods "onclick"
  for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = ({ target }) => {
      const Digit = target.getAttribute("data-key");
      if (Digit === "enter") {
        handleSubmitNum();
        return;
      }
      if (Digit == "del") {
        handleDelDigit();
        return;
      }
      updateGuessNums(Digit);
    };
  }
});
