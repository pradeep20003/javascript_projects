const passBox = document.getElementById("pass-box");
const totalChar = document.getElementById("total-char");
const upperCase = document.getElementById("upper-case");
const lowerCase = document.getElementById("lower-case");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");
const btn = document.getElementById("btn");

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{};:,.<>?/|~`-=";

function generatePassword() {
  let allowedChars = "";

  if (upperCase.checked) allowedChars += upperChars;
  if (lowerCase.checked) allowedChars += lowerChars;
  if (numbers.checked) allowedChars += numberChars;
  if (symbols.checked) allowedChars += symbolChars;

  if (!allowedChars) {
    passBox.innerText = "Select options!";
    return;
  }

  let length = parseInt(totalChar.value, 10);
  if (isNaN(length) || length < 2) length = 2;
  if (length > 30) length = 30;
  totalChar.value = length;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * allowedChars.length);
    password += allowedChars[randIndex];
  }

  passBox.innerText = password;
}

btn.addEventListener("click", generatePassword);

// Optional: click to copy password
passBox.addEventListener("click", () => {
  const text = passBox.innerText.trim();
  if (!text || text === "Testing" || text === "Select options!") return;

  navigator.clipboard
    .writeText(text)
    .then(() => alert("Password copied!"))
    .catch(() => alert("Could not copy password."));
});
