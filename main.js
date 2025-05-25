function toggleMode() {
  let mode = document.getElementById('mode').value;
  document.getElementById('encodeBtn').style.display = mode === 'encode' ? 'inline-block' : 'none';
  document.getElementById('decodeBtn').style.display = mode === 'decode' ? 'inline-block' : 'none';
}

function encode() {
  let msg = document.getElementById('message').value;
  let key = parseInt(document.getElementById('key').value);
  let output = '';
  for (let i = 0; i < msg.length; i++) {
    let c = msg.charCodeAt(i);
    if (msg[i].match(/[a-z]/i)) {
      let base = (msg[i] === msg[i].toUpperCase()) ? 65 : 97;
      output += String.fromCharCode(((c - base + key) % 26) + base);
    } else {
      output += msg[i];
    }
  }
  document.getElementById('output').innerText = output;
}

function decode() {
  let msg = document.getElementById('message').value;
  let key = parseInt(document.getElementById('key').value);
  let output = '';
  for (let i = 0; i < msg.length; i++) {
    let c = msg.charCodeAt(i);
    if (msg[i].match(/[a-z]/i)) {
      let base = (msg[i] === msg[i].toUpperCase()) ? 65 : 97;
      output += String.fromCharCode(((c - base - key + 26) % 26) + base);
    } else {
      output += msg[i];
    }
  }
  document.getElementById('output').innerText = output;
}

document.addEventListener('DOMContentLoaded', toggleMode);
