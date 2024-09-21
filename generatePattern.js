const isNumberInRow = (grid, row, num) => {
    for (let i = 0; i < 9; i++) {
      if ((grid[row][i] === num) || (grid[row][i] === (num * (-1) - 1))) {
        return true;
      }
    }
    return false;
  };
  
  const isNumberInCol = (grid, col, num) => {
    for (let i = 0; i < 9; i++) {
      if ((grid[i][col] === num) || (grid[i][col] === (num * (-1) - 1))) {
        return true;
      }
    }
    return false;
  };

const generatePattern = (difficulty) => {
  
  console.log("Enter generatePattern()");
  
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
  let blackWithNumberCount, whiteWithNumberCount;

  if (difficulty === 'easy') {
    blackWithNumberCount = Math.floor(Math.random() * 3) + 11;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 24;
  } else if (difficulty === 'medium') {
    blackWithNumberCount = Math.floor(Math.random() * 3) + 9;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 21;
  } else if (difficulty === 'hard') {
    blackWithNumberCount = Math.floor(Math.random() * 3) + 7;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 18;
  } else if (difficulty === 'diabolical') {
    blackWithNumberCount = Math.floor(Math.random() * 3) + 5;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 15;
  } else if (difficulty === 'extreme') {
    blackWithNumberCount = Math.floor(Math.random() * 3) + 3;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 12;
  } else {
    // Default to medium difficulty
    blackWithNumberCount = Math.floor(Math.random() * 3) + 9;
    whiteWithNumberCount = Math.floor(Math.random() * 3) + 21;
  }
  
  let count = 0;
  let foundNumber = false;
  while(!foundNumber && count < 100) {

    console.log("First attempt! ++++++++++++++");
    if(count === 2) {return grid;} //Muss noch weg!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
  for (let i = 0; i < blackWithNumberCount; i++) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);
    let numberFindCounter = 0;
    do {
      numberFindCounter++;
      const randomValue = Math.floor(Math.random() * 9) + 2; 
      if(!(isNumberInCol(grid, randomCol, randomValue) || isNumberInRow(grid, randomRow, randomValue))){
          foundNumber = true;
          grid[randomRow][randomCol] = -randomValue;
      }
    } while (!foundNumber && numberFindCounter < 9)
  }

  const remainingBlackCount = 18 - blackWithNumberCount;
  
  for (let i = 0; i < remainingBlackCount; i++) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);
    grid[randomRow][randomCol] = -1;
  }

  for (let i = 0; i < whiteWithNumberCount; i++) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);
    let numberFindCounter = 0;
    let foundNumber = false;
    let notPossibleNumbers = [];
    do {
        
        let randomValue = Math.floor(Math.random() * 9) + 1; 
      while (notPossibleNumbers.includes(randomValue)) {
        if(notPossibleNumbers.length < 9) {
        randomValue = Math.floor(Math.random() * 9) + 1; 
        } else {
            break;
        }
      }
      /*if(!(isNumberInCol(grid, randomCol, randomValue) || isNumberInRow(grid, randomRow, randomValue))){*/
      if(isValidNumber(grid, randomRow, randomCol,randomValue)){
        const testGrid = grid;
        testGrid[randomRow][randomCol] = randomValue;
        if (solveStr8ts(testGrid)) {
          foundNumber = true;
          grid[randomRow][randomCol] = randomValue;
        } else {
            notPossibleNumbers.push(randomValue);
            if (notPossibleNumbers.length > 8) {
                break;
            }
        }
      }
    } while (!foundNumber)
  }
  count++;
}
  //console.log("Grid Pattern: ", grid);
  return grid;
};

const isStr8tsValid = (grid) => {
  const isValidRow = (row) => {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      const val = grid[row][i];
      const value = (val < 0) ? val * (-1) - 1 : val; // Um negative Werte zu positiven zu machen
      if (value === 0) continue; // Ignoriere leere Felder
      if (seen.has(value)) return false;
      seen.add(value);
    }
    return true;
  };

  const isValidCol = (col) => {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      const val = grid[i][col];
      const value = Math.abs(grid[i][col]); // Um negative Werte zu positiven zu machen
      if (value === 0) continue; // Ignoriere leere Felder
      if (seen.has(value)) return false;
      seen.add(value);
    }
    return true;
  };

  for (let i = 0; i < 9; i++) {
    if (!isValidRow(i) || !isValidCol(i)) return false;
  }

  return true;
};

const isStraight = (sequence) => {
    // Überprüfe, ob die Zahlen in der Sequenz eine lückenlose Straße bilden
    const sortedSequence = [...sequence].sort((a, b) => a - b);
    for (let i = 0; i < sortedSequence.length - 1; i++) {
      if (sortedSequence[i + 1] - sortedSequence[i] !== 1) {
        return false;
      }
    }
    return true;
  };
  
  const isValidStraightSequence = (grid, row, col, num) => {
    let sequence = [];
    let blockedNumbers = new Set();

    let newGrid = grid;
    if (num > 0) {
    newGrid[row][col] = num;
    }

    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        const val = newGrid[rowIndex][col];
        if (val >= 0) {
            sequence.push(val);
        } else {
            let minValue = Math.min(...sequence);
            let maxValue = Math.max(...sequence);
            for (let i = minValue; i <= maxValue; i++) {
                if (!(isNumberInRow(grid, row, i) || isNumberInCol(grid, col, num))) {
                sequence.push(i);
                }
            }
            if (isStraight(sequence)) {
                sequence = []
                continue;
            } else {return false;}
        }
    }
    for (let colIndex = 0; colIndex < 9; colIndex++) {
        const val = newGrid[row][colIndex];
        if (val >= 0) {
            sequence.push(val);
        } else {
            let minValue = Math.min(...sequence);
            let maxValue = Math.max(...sequence);
            for (let i = minValue; i <= maxValue; i++) {
                if (!(isNumberInRow(grid, row, i) || isNumberInCol(grid, col, num))) {
                sequence.push(i);
                }
            }
            if (isStraight(sequence)) {
                sequence = []
                continue;
            } else {return false;}
        }
    }
  
    if (sequence.length === 0) {
      return true; // Keine Zahlen in der Zeile, keine Straße benötigt
    } 
    return true;
}

  const isValidNumber = (grid, row, col, num) => {
    // Überprüfe, ob die Zahl in der Zeile und Spalte gültig ist
    console.log("row & col & num = ", row, col, num);
    console.log("isValidNumber() with grid: ", grid);
    console.log("grid[row] = ", grid[row]);
    const column = [];
    for (let j = 0; j < 9; j++) {
      column.push(grid[j][col]);
    }
    console.log("column: ", column);
    console.log("isNumberInCol = ", isNumberInCol(grid, col, num));
    console.log("isNumberInRow = ", isNumberInRow(grid, row, num));
    //console.log("isValidStr8stSequence = ", isValidStraightSequence(grid[row]));
    console.log("_____________________________________________________");
    return (!isNumberInCol(grid, col, num) && !isNumberInRow(grid, row, num) && isValidStraightSequence(grid, row, col, num) && isValidStraightSequence(grid, row, col, num))
    //return(!(isNumberInCol(grid, col, num) || isNumberInRow(grid,row, num)));
};
  
const solveStr8ts = (grid) => {
    console.log("enter solving");
    const emptyCell = findEmptyCell(grid);
  
    if (!emptyCell) {
      return true; // Keine leeren Zellen mehr, Rätsel gelöst
    }
  
    const { row, col } = emptyCell;
  
    for (let num = 1; num <= 9; num++) {
      if (isValidNumber(grid, row, col, num)) {
        grid[row][col] = num;
  
        if (solveStr8ts(grid)) {
          return true;
        }
  
        grid[row][col] = 0;
      }
    }
  
    return false; // Keine gültige Zahl gefunden
  };
  

  const findEmptyCell = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === 0) {
          return { row, col };
        }
      }
    }
    return null;
  };
  
  /*const isNumberInRow = (grid, row, num) => {
    for (let i = 0; i < 9; i++) {
      if ((grid[row][i] === num) || (grid[row][i] === (num * (-1) - 1))) {
        return true;
      }
    }
    return false;
  };
  
  const isNumberInCol = (grid, col, num) => {
    for (let i = 0; i < 9; i++) {
      if ((grid[i][col] === num) || (grid[i][col] === (num * (-1) - 1))) {
        return true;
      }
    }
    return false;
  };*/

export default generatePattern;
