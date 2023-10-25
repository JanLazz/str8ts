
const generateEmptyGrid = () => {
  return Array.from({ length: 8 }, () => Array(8).fill(0));
};

const fillDiagonals = (grid) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const number = i * 3 + j + 1;
        grid[i][j] = number;
      }
    }
    return grid;
  };

  const shuffleRows = (grid) => {
    for (let i = 0; i < 100; i++) {
      const row1 = Math.floor(Math.random() * 8);
      const row2 = Math.floor(Math.random() * 8);
      [grid[row1], grid[row2]] = [grid[row2], grid[row1]];
    }
    return grid;
  };
  
  const shuffleColumns = (grid) => {
    for (let i = 0; i < 100; i++) {
      const col1 = Math.floor(Math.random() * 8);
      const col2 = Math.floor(Math.random() * 8);
      for (let j = 0; j < 8; j++) {
        [grid[j][col1], grid[j][col2]] = [grid[j][col2], grid[j][col1]];
      }
    }
    return grid;
  };

  const removeNumbers = (grid, difficulty) => {
    let numToRemove = 0;
    switch (difficulty) {
      case 'easy':
        numToRemove = 25;
        break;
      case 'medium':
        numToRemove = 30;
        break;
      case 'hard':
        numToRemove = 35;
        break;
      case 'extreme':
        numToRemove = 40;
        break;
      case 'melina':
        numToRemove = 45;
        break;
      default:
        numToRemove = 30;
    }
    
    for (let i = 0; i < numToRemove; i++) {
      const row = Math.floor(Math.random() * 8);
      const col = Math.floor(Math.random() * 8);
      grid[row][col] = 0;
    }
    return grid;
  };

  const addBlockedCells = (grid) => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Math.random() < 0.2) { // Wahrscheinlichkeit für eine schwarze Zelle
          const blockedNumber = Math.floor(Math.random() * 8) + 1; // Zufällige Zahl von 1 bis 8
          grid[i][j] = -blockedNumber; // Markiere die Zelle als schwarz und blockiere eine Zahl
        }
      }
    }
    return grid;
  };  

 const generateStr8ts = (difficulty) => {
  let grid = generateEmptyGrid();
  grid = fillDiagonals(grid);
  grid = shuffleRows(grid);
  grid = shuffleColumns(grid);
  grid = removeNumbers(grid, difficulty);
  grid = addBlockedCells(grid); // Funktion für die schwarzen Zellen
  return grid;
};

  export default generateStr8ts;
  