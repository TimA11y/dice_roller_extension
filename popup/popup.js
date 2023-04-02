// UI Variables
const form = document.querySelector("form");
const txtDice = document.querySelector("#txtDice");
const messages = document.querySelector("#messages");

// Other Variables
const diceExp = /^(\d*)d(\d+)/;

// Functions
const rollDie = function (sides) {
  return Math.floor(Math.random() * sides) + 1;
}; // end rollDie function.

const rollDice = function (number, sides) {
  let results = {
    "total": 0,
    "rolls": []
  };

  for (let i = 0; i < number; i++) {
    let value = rollDie(sides);
    results.total = results.total + value;
    results.rolls.push(value);
  } // end for i.

  return results;
}; // end rollDice function.

const sendMessage = function (message) {
  messages.innerHTML = "";
  messages.textContent = message;
}; // end sendMessage function.

// Main
form.addEventListener("submit", function (event) {
  // Get the information for the dice to be rolled.
  let [dice, number, sides] = (txtDice.value).match(diceExp);
  if (number == "") {
    number = "1";
  } // end if.

  number = parseInt(number);
  sides = parseInt(sides);

  let results = rollDice(number, sides);
  sendMessage(`${results.total} [${results.rolls.join(", ")}] (${dice})`);
  event.preventDefault();
}); // end submit event.