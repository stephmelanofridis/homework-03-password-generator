// DOM Elements
var password = document.querySelector("#password");
var passwordLength = document.querySelector("#length");
var includeUppercase = document.querySelector("#uppercase");
var includeLowercase = document.querySelector("#lowercase");
var includeNumerals = document.querySelector("#numerals");
var includeSymbols = document.querySelector("#symbols");
var generateBtn = document.querySelector("#generate");

// Random Generator Object
var randomGenerator = {
  lowercase: getRandomLower,
  uppercase: getRandomUpper,
  numerals: getRandomNumerals,
  symbols: getRandomSymbols,
};

// Checking which options are selected
generateBtn.addEventListener("click", () => {
  var length = passwordLength.value;
  var hasLower = includeLowercase.checked;
  var hasUpper = includeUppercase.checked;
  var hasNumerals = includeNumerals.checked;
  var hasSymbols = includeSymbols.checked;

  password.innerText = generatePassword(hasLower, hasUpper, hasNumerals, hasSymbols, length);
});

// Generate password
function generatePassword(lowercase, uppercase, numerals, symbols, length) {
  var generatedPassword = " ";
  var typesCount = lowercase + uppercase + numerals + symbols;
  var typesArray = [{ lowercase }, { uppercase }, { numerals }, { symbols }].filter(item =>
    Object.values(item)[0]);

  if (typesCount === 0) {
    return "Please select from the options below what you would like included in your random password."
  }

  if (passwordLength.value < 8) {
    return "Pasword must be more than 8 characters."
  }

  if (passwordLength.value > 128) {
    return "Password must be less than 128 characters."
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      var funcName = Object.keys(type)[0];
      generatedPassword += randomGenerator[funcName]();
    });
  }

  return generatedPassword;

};


// Random character group generator
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumerals() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbols() {
  var symbols = "!@#$%^&*_+";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
