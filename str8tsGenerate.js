import generatePattern from './generatePattern.js';

const fillWhiteFields = (grid) => {
  console.log("Enter fillWhiteFields()");
  
  console.log("grid.length", grid.length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Alle möglichen Ziffern

        // Überprüfe die Zeile
        for (let k = 0; k < 9; k++) {
          const num = grid[i][k];
          if (num > 0) {
            candidates = candidates.filter(candidate => candidate !== num);
          }
        }

        // Überprüfe die Spalte
        for (let k = 0; k < 9; k++) {
          const num = grid[k][j];
          if (num > 0) {
            candidates = candidates.filter(candidate => candidate !== num);
          }
        }

        // Falls nur noch eine mögliche Ziffer übrig ist, fülle das Feld
        if (candidates.length === 1) {
          grid[i][j] = candidates[0];
        }
      }
    }
  }

  return grid;
};

const fillBlockedFields = (grid) => {
  console.log("Enter fillBlockedFields()");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] < 0 && Math.random() < 0.5) { // Nur in manchen schwarzen Feldern
        const blockedNumber = -grid[i][j];

        // Überprüfe die Zeile
        let count = 0;
        for (let k = 0; k < 9; k++) {
          if (grid[i][k] === 0 && k !== j) {
            count++;
          }
        }
        if (count === 1) {
          grid[i][j] = blockedNumber;
          continue;
        }

        // Überprüfe die Spalte
        count = 0;
        for (let k = 0; k < 9; k++) {
          if (grid[k][j] === 0 && k !== i) {
            count++;
          }
        }
        if (count === 1) {
          grid[i][j] = blockedNumber;
        }
      }
    }
  }

  return grid;
};

const removeNumbers = (grid, difficulty) => {
  console.log("Enter removeNumbers()");

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

  const removedNumbers = [];

  for (let i = 0; i < numToRemove; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    } while (grid[row][col] === 0);

    const temp = grid[row][col];
    grid[row][col] = 0;

    // Prüfe, ob das Str8ts noch lösbar ist
    const tempGrid = JSON.parse(JSON.stringify(grid));
    console.log("tempGrid: ", tempGrid);
    const solved = solveStr8ts(tempGrid);

    if (!solved) {
      grid[row][col] = temp; // Setze die Zahl zurück, wenn das Str8ts nicht mehr lösbar ist
      removedNumbers.push(temp);
      console.log(`Removed number ${temp} at position (${row}, ${col})`);
    }
  }

  console.log("Removed Numbers: ", removedNumbers);

  return { grid, removedNumbers };
};


const solveStr8ts = (grid, depth = 0, maxDepth = 10) => {
  console.log("Enter solveStr8ts");
  console.log("grid.length", grid.length);
  console.log("depth = ", depth);
  if (depth >= maxDepth) {
    console.log("Maximale Rekursionstiefe erreicht. Möglicherweise eine Endlosschleife.");
    return null; // Oder eine andere Rückgabewert, um anzuzeigen, dass es nicht gelöst werden konnte.
  }
  for (let i = 0; i < grid.length; i++) {
    console.log("i", i);
    console.log("grid[i].length = ", grid[i].length);
    console.log("grid[i] = ", grid[i]);
    for (let j = 0; j < grid[i].length; j++) {
      console.log("grid[i][j] = ", grid[i][j]);
      if (grid[i][j] === 0) {
        for (let num = 1; num <= 9; num++) {
          console.log("Before isValidMove()");
          if (num >= 1 && num <= 9 && isValidMove(grid, i, j, num)) {
            grid[i][j] = num;
            console.log("Before solveStr8ts(grid)");
            if (solveStr8ts(grid, depth + 1, maxDepth)) {
              return true;
            }
            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};


const removeBlackNumbers = (grid, difficulty) => {
  console.log("Enter removeBlackNumbers()");

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

  let removedCount = 0;
  while (removedCount < numToRemove) {
    const row = Math.floor(Math.random() * 8);
    const col = Math.floor(Math.random() * 8);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      removedCount++;
    }
  }

  return grid;
};

const determineDifficulty = (str8ts) => {
  console.log("Enter determineDifficulty()");

  const emptyCellCount = str8ts.flat().filter(cell => cell === 0).length;
  const fixedNumberCount = str8ts.flat().filter(cell => cell > 0).length;
  
  // Hier könntest du die anderen Kriterien hinzufügen und berücksichtigen
  
  // Beispiel: Anzahl der langen Straßen
  const longStreetsCount = countLongStreets(str8ts);

  // Beispiel: Prüfen auf Symmetrie
  const isSymmetrical = checkSymmetry(str8ts);

  // Beispiel: Anzahl der möglichen Lösungen
  const solutionsCount = countSolutions(str8ts);

  // Beispiel: Verhältnis zwischen schwarzen und weißen Feldern
  const blackToWhiteRatio = calculateBlackToWhiteRatio(str8ts);

  // Hier kombinierst du die verschiedenen Kriterien nach deiner Einschätzung
  // und gibst eine Schwierigkeitsstufe zurück

  if (emptyCellCount <= 25 && fixedNumberCount >= 35 && longStreetsCount >= 4) {
    return 'extreme';
  } else if (emptyCellCount <= 30 && fixedNumberCount >= 30 && isSymmetrical) {
    return 'hard';
  } else if (emptyCellCount <= 35 && fixedNumberCount >= 25 && solutionsCount === 1) {
    return 'medium';
  } else {
    return 'easy';
  }
};

const countLongStreets = (str8ts) => {
  console.log("Enter countLongStreets()");

  let longStreetsCount = 0;

  for (let i = 0; i < 9; i++) {
    let currentStreetLength = 0;
    for (let j = 0; j < 9; j++) {
      if (str8ts[i][j] === 0) {
        currentStreetLength++;
      } else {
        if (currentStreetLength >= 6) {
          longStreetsCount++;
        }
        currentStreetLength = 0;
      }
    }
    if (currentStreetLength >= 6) {
      longStreetsCount++;
    }
  }

  return longStreetsCount;
};

const checkSymmetry = (str8ts) => {
  console.log("Enter checkSymmetry()");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (str8ts[i][j] !== str8ts[8 - i][8 - j]) {
        return false;
      }
    }
  }
  return true;
};

const countSolutions = (str8ts) => {
  console.log("Enter countSOlutions()");

  let solutionsCount = 0;

  const solve = (grid) => {
    console.log("solve() with grid: ", grid);
    const emptyCell = findEmptyCell(grid);
    console.log("emptyCell = ", emptyCell);
    if (!emptyCell) {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!emptyCell");
      solutionsCount++;
      return;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      console.log("num rising = ", num);
      if (isValidMove(grid, row, col, num)) {
        grid[row][col] = num;
        console.log("solve(grid): grid = ", grid)
        solve(grid);
        console.log("after solver(grid)");
        grid[row][col] = 0; // Backtrack
      }
    }
  };
  console.log("solve(str8ts): str8ts = ", str8ts);
  return;
  solve(str8ts);
  return solutionsCount;
};

const calculateBlackToWhiteRatio = (str8ts) => {
  console.log("Enter calculateBtoWRatio()");

  const blackCount = str8ts.flat().filter(cell => cell < 0).length;
  const whiteCount = str8ts.flat().filter(cell => cell === 0).length;

  console.log("blackCount / whiteCount = ", blackCount / whiteCount);

  return blackCount / whiteCount;
};

const findEmptyCell = (grid) => {
  console.log("Enter findEmptyCell()");

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null;
};

const isValidMove = (grid, row, col, num) => {
  console.log("Enter isValidMove()");
  
  return (
    !isInRow(grid, row, num) &&
    !isInColumn(grid, col, num) &&
    !isInBox(grid, row - (row % 3), col - (col % 3), num) &&
    grid[row][col] !== num
  );
};

const isInRow = (grid, row, num) => {
  console.log("Enter isInRow()");

  return grid[row].includes(num);
};

const isInColumn = (grid, col, num) => {
  console.log("Enter isInColumn()");
  
  console.log(`Enter isInColumn() with num = ${num}`);
  console.log("Enter isInColumn() with col = ", col);
  console.log("Enter isInColumn() with grid = ", grid);
  console.log("Enter isInColumn() with grid.map = ", grid.map);
  console.log("Enter isInColumn() with grid.map(row => row[col]) = ", grid.map(row => row[col]));
  console.log("Enter isInColumn() with grid.map(row => row[col]).includes(num) = ", grid.map(row => row[col]).includes(num));

  return grid.map(row => row[col]).includes(num);
};

const isInBox = (grid, startRow, startCol, num) => {
console.log("Enter isInBox() with startRow & startCol = ", startRow, " & ", startCol);

  for (let i = 0; i < 3; i++) {
    console.log("i = ", i);
    for (let j = 0; j < 3; j++) {
      console.log("j = ", j);
      grid[i + startRow][j + startCol] === num
      if (grid[i + startRow][j + startCol] === num) {
        return true;
      }
    }
  }
  return false;
};


const generateStr8ts = (difficulty) => {
  console.log("Enter generateStr8ts()");

  const pattern = generatePattern();
  const filledGrid = fillBlockedFields(fillWhiteFields(pattern), difficulty);

  const finalGrid = applyCriteriaWithRetries(filledGrid, difficulty, 100);
  return finalGrid;
};

const countEmptyCells = (grid) => {
  console.log("Enter countEmptyCells()");

  let count = 0;
  
  console.log("grid.length", grid.length);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        count++;
      }
    }
  }

  return count;
};

const countFixedNumbers = (str8ts) => {
  let fixedNumberCount = 0;

  for (let i = 0; i < str8ts.length; i++) {
    for (let j = 0; j < str8ts[i].length; j++) {
      if (str8ts[i][j] > 0) {
        fixedNumberCount++;
      }
    }
  }

  return fixedNumberCount;
};

const applyCriteriaWithRetries = (str8ts, difficulty, maxRetries = 100) => {
  let retries = 0;

  while (retries < maxRetries) {
    const determinedDifficulty = determineDifficulty(str8ts);
    console.log("countSolutions(str8ts) = ", countSolutions(str8ts));
    const criteria = {
      emptyCellCount: countEmptyCells(str8ts),
      fixedNumberCount: countFixedNumbers(str8ts),
      longStreetsCount: countLongStreets(str8ts),
      isSymmetrical: checkSymmetry(str8ts),
      solutionsCount: countSolutions(str8ts),
      blackToWhiteRatio: calculateBlackToWhiteRatio(str8ts)
    };

    let adjustedCriteria;
    
    console.log("(determinedDifficulty === difficulty) = ", (determinedDifficulty === difficulty));
    if (determinedDifficulty === difficulty) {
      adjustedCriteria = criteria;
    } else {
      adjustedCriteria = adjustCriteria(criteria, difficulty);
    }

    const numToRemove = adjustedCriteria.emptyCellCount - adjustedCriteria.fixedNumberCount;

    if (numToRemove >= 0) {
      console.log("removeNumber");
      str8ts = removeNumbers(str8ts, difficulty, numToRemove); // Hier werden die Zahlen entfernt
      return str8ts; // Gib das aktualisierte Str8ts-Feld zurück
    }

    retries++;
  }

  throw new Error(`Es konnte keine passende Anpassung gefunden werden nach ${maxRetries} Versuchen.`);
};


const adjustCriteria = (criteria, difficulty) => {
  console.log("Enter adjustCriteria");
  switch (difficulty) {
    case 'easy':
      criteria.emptyCellCount += 5;
      criteria.fixedNumberCount -= 5;
      criteria.longStreetsCount -= 2;
      break;
    case 'medium':
      criteria.emptyCellCount += 0;
      criteria.fixedNumberCount += 0;
      criteria.longStreetsCount += 0;
      break;
    case 'hard':
      criteria.emptyCellCount -= 5;
      criteria.fixedNumberCount += 5;
      criteria.longStreetsCount += 2;
      break;
    case 'extreme':
      criteria.emptyCellCount -= 10;
      criteria.fixedNumberCount += 10;
      criteria.longStreetsCount += 4;
      break;
    case 'melina':
      criteria.emptyCellCount -= 15;
      criteria.fixedNumberCount += 15;
      criteria.longStreetsCount += 6;
      break;
    default:
      break;
  }
  return criteria;
};



export default generateStr8ts;