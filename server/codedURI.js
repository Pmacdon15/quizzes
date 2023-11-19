const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the word to change: ", (wordToChange) => {
  const codedUri = encodeURIComponent(wordToChange);
  console.log(codedUri);

  rl.close();
});
