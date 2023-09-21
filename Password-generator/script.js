// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// abcdefghijklmnopqrstuvwxyz
// !\"$%&/()=?@~`\\.\';:+=^*_-
// 0123456789

// Function to generate a random password
function genPassword() {
  const length = document.getElementById("length").value
  const includeUppercase = document.getElementById("uppercase").checked
  const includeLowercase = document.getElementById("lowercase").checked
  const includeNumbers = document.getElementById("numbers").checked
  const includeSymbols = document.getElementById("symbols").checked

  const password = generatePassword(
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols
  )

    document.getElementById("output").value = password
    document.getElementById('length-val').textContent = length;
}

// Function to generate a random password
function generatePassword(
  length,
  includeUppercase,
  includeLowercase,
  includeNumbers,
  includeSymbols
) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const numberChars = "0123456789"
  const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?"

  let allChars = ""
  let password = ""

  if (includeUppercase) {
    allChars += uppercaseChars
  }
  if (includeLowercase) {
    allChars += lowercaseChars
  }
  if (includeNumbers) {
    allChars += numberChars
  }
  if (includeSymbols) {
    allChars += symbolChars
  }

  if (allChars === "") {
    alert("Please select at least one character type.")
    return
  }

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    password += allChars.charAt(randomIndex)
  }

  return password
}

// Function to copy the generated password to clipboard
function copyClipboard() {
  const passwordField = document.getElementById("output")
  passwordField.select()
  document.execCommand("copy")
  alert("Password copied to clipboard!")
}

// Initialize the password generation when the page loads
window.onload = genPassword
