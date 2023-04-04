// UI Variables
const form = document.querySelector("form");
const txtDice = document.querySelector("#txtDice");
const messages = document.querySelector("#messages");

// Other Variables
const diceExp = /^(\d*)d(\d+)(\+|\-)?(\d*)/;

// Functions
const rollDie = function (sides) {
  return Math.floor(Math.random() * sides) + 1;
}; // end rollDie function.

const rollDice = function (number, sides, bonusModifier) {
  let results = {
    "total": 0,
    "rolls": []
  };

  for (let i = 0; i < number; i++) {
    let value = rollDie(sides);
    results.total = results.total + value;
    results.rolls.push(value);
  } // end for i.

  results.total = results.total + bonusModifier;

  return results;
}; // end rollDice function.

const sendMessage = function (message) {
  messages.innerHTML = "";
  messages.textContent = message;
}; // end sendMessage function.

// Main
form.addEventListener("submit", function (event) {
  // Get the information for the dice to be rolled.
  let [dice, number, sides, modifierType, bonus] = (txtDice.value).match(diceExp);
  if (number == "") {
    number = "1";
  } // end if.
  if (bonus === "") {
    bonus = 0;
  }  // end if bonus.
  if (modifierType === "-") {
    bonus = bonus * -1;
  } // end if modifierType.

  number = parseInt(number);
  sides = parseInt(sides);
  bonus = parseInt(bonus);

  let results = rollDice(number, sides, bonus);
  txtDice.setSelectionRange(0, txtDice.value.length);
  sendMessage(`${results.total} [${results.rolls.join(", ")}] (${dice})`);
  event.preventDefault();
}); // end submit event.
