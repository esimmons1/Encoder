Playfair Cipher Encoder/Decoder
===============================

Made by: Ellis Simmons, May 2025  
Language: JavaScript, HTML, CSS

What is this?
--------------
A simple web-based encoder/decoder for the Playfair cipher. You enter a keyword and a message, and it’ll encrypt or decrypt it according to the Playfair rules.

How it works:
--------------
The Playfair cipher uses a 5x5 matrix built from your keyword. Each pair of letters in the message is swapped and shifted based on their positions in the matrix:
- Same row: Shift right (encryption) or left (decryption).
- Same column: Shift down (encryption) or up (decryption).
- Otherwise, swap the columns.

When the message has repeating letters, we insert an ‘X’ in between them. If there’s an odd number of letters, we add an ‘X’ at the end.

How to run:
-----------
- Open `index.html` in your web browser.
- Type in your key and your message.
- Click **Encrypt** or **Decrypt** to see the result in the output box.
- Also open: https://esimmons1.github.io/Encoder

You can tweak:
--------------
- Key preparation and character replacements (currently it replaces `J` with `I`).
- How repeating letters are handled (currently uses `X` as a filler).
- The visuals by editing `style.css` to make it prettier.

Inspired by:
------------
- The classic Playfair cipher from 1854.
- The website at https://planetcalc.com/7751/ which does a similar thing.

Notes:
------
This is a straightforward demonstration of the Playfair cipher, so it’s not secure by modern standards. Still, it’s a neat historical cipher and a fun project!

---
As per usual, if you’re going to steal or use it at least credit me please. Thank you for reading and have a nice day.
