// script.js

// Prepare the Playfair key table
function generateKeyTable(key) {
  key = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
  let seen = new Set();
  let table = [];

  // Add key letters first
  for (let char of key) {
    if (!seen.has(char)) {
      seen.add(char);
      table.push(char);
    }
  }

  // Add remaining letters (I/J combined)
  for (let i = 0; i < 26; i++) {
    let char = String.fromCharCode(65 + i);
    if (char === 'J') continue; // J is combined with I
    if (!seen.has(char)) {
      seen.add(char);
      table.push(char);
    }
  }

  // Convert to 5x5 matrix
  let matrix = [];
  for (let i = 0; i < 5; i++) {
    matrix.push(table.slice(i * 5, i * 5 + 5));
  }
  return matrix;
}

// Find position of a letter in the matrix
function findPosition(matrix, char) {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) return { row, col };
    }
  }
  return null;
}

// Prepare the plaintext/ciphertext pairs for Playfair
function prepareText(text, encrypting = true) {
  text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');

  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char1 = text[i];
    let char2 = text[i + 1] || '';

    if (char1 === char2) {
      result += char1 + 'X';
    } else {
      result += char1;
      if (char2) {
        result += char2;
        i++;
      } else if (encrypting) {
        result += 'X';
      }
    }
  }
  return result;
}

function playfairEncrypt(text, key) {
  let matrix = generateKeyTable(key);
  let prepared = prepareText(text, true);
  let ciphertext = '';

  for (let i = 0; i < prepared.length; i += 2) {
    let a = prepared[i];
    let b = prepared[i + 1];
    let posA = findPosition(matrix, a);
    let posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      // Same row - shift right
      ciphertext += matrix[posA.row][(posA.col + 1) % 5];
      ciphertext += matrix[posB.row][(posB.col + 1) % 5];
    } else if (posA.col === posB.col) {
      // Same column - shift down
      ciphertext += matrix[(posA.row + 1) % 5][posA.col];
      ciphertext += matrix[(posB.row + 1) % 5][posB.col];
    } else {
      // Rectangle swap columns
      ciphertext += matrix[posA.row][posB.col];
      ciphertext += matrix[posB.row][posA.col];
    }
  }

  return ciphertext;
}

function playfairDecrypt(text, key) {
  let matrix = generateKeyTable(key);
  let plaintext = '';

  for (let i = 0; i < text.length; i += 2) {
    let a = text[i];
    let b = text[i + 1];
    let posA = findPosition(matrix, a);
    let posB = findPosition(matrix, b);

    if (posA.row === posB.row) {
      // Same row - shift left
      plaintext += matrix[posA.row][(posA.col + 4) % 5];
      plaintext += matrix[posB.row][(posB.col + 4) % 5];
    } else if (posA.col === posB.col) {
      // Same column - shift up
      plaintext += matrix[(posA.row + 4) % 5][posA.col];
      plaintext += matrix[(posB.row + 4) % 5][posB.col];
    } else {
      // Rectangle swap columns
      plaintext += matrix[posA.row][posB.col];
      plaintext += matrix[posB.row][posA.col];
    }
  }

  return plaintext;
}

// Hook up buttons and fields
document.getElementById('encrypt').addEventListener('click', () => {
  let key = document.getElementById('key').value;
  let message = document.getElementById('message').value;

  if (!key) {
    alert('Please enter a key.');
    return;
  }
  if (!message) {
    alert('Please enter a message.');
    return;
  }

  let encoded = playfairEncrypt(message, key);
  document.getElementById('output').value = encoded;
});

document.getElementById('decrypt').addEventListener('click', () => {
  let key = document.getElementById('key').value;
  let message = document.getElementById('message').value;

  if (!key) {
    alert('Please enter a key.');
    return;
  }
  if (!message) {
    alert('Please enter a message.');
    return;
  }

  let decoded = playfairDecrypt(message, key);
  document.getElementById('output').value = decoded;
});
