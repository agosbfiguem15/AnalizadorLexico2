import symbolTable from './lexemes.json';

export const lexicalAnalyzer = (input) => {
  const tokens = [];
  let currentIndex = 0;

  while (currentIndex < input.length) {
    let char = input[currentIndex];

    if (/\s/.test(char)) {
      currentIndex++;
      continue;
    }

    if (/[a-zA-Z]/.test(char)) {
      let identifier = char;
      currentIndex++;

      while (/[a-zA-Z0-9]/.test(input[currentIndex])) {
        identifier += input[currentIndex];
        currentIndex++;
      }

      const symbolEntry = symbolTable.find(entry => entry.nombre === identifier);

      if (symbolEntry) {
        tokens.push({ type: symbolEntry.tipo, value: identifier });
      } else {
        tokens.push({ type: 'identificador', value: identifier });
      }
    } else if (/[0-9]/.test(char)) {
      let number = char;
      currentIndex++;

      while (/[0-9]/.test(input[currentIndex])) {
        number += input[currentIndex];
        currentIndex++;
      }
      const symbolEntry = symbolTable.find(entry => entry.nombre === number);

      if (symbolEntry) {
        tokens.push({ type: symbolEntry.tipo, value: number });
      } else {
        console.error(`Error: Identificador no reconocido '${number}'`);
        tokens.push(`Error: Identificador no reconocido '${number}'`);
      }

    } else if (/[\(\)\{\}\[\]\+\-\*\/\=\;\<\>\,]/.test(char)) {
      let symbole = char;
      currentIndex++;

      while (/[\(\)\{\}\[\]\+\-\*\/\=\;\<\>\,]/.test(input[currentIndex])) {
        symbole += input[currentIndex];
        currentIndex++; 
      }

      const symbolEntry = symbolTable.find(entry => entry.nombre === symbole);

      if (symbolEntry) {
        tokens.push({ type: symbolEntry.tipo, value: symbole });
      } else {
        console.error(`Error: Símbolo no reconocido '${char}'`);
        tokens.push(`Error: Símbolo no reconocido '${char}'`);
      }

      currentIndex++;
    }
    else {
      console.error(`Error: Carácter no reconocido '${char}'`);
      tokens.push(`Error: Carácter no reconocido '${char}'`);
      currentIndex++;
    }
  }

  return tokens;
}

  