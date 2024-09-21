import generatePattern from './generatePattern.js';

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
    const criteria = {
      emptyCellCount: countEmptyCells(str8ts),
      fixedNumberCount: countFixedNumbers(str8ts),
      longStreetsCount: countLongStreets(str8ts),
      isSymmetrical: checkSymmetry(str8ts),
      blackToWhiteRatio: calculateBlackToWhiteRatio(str8ts)
    };

    let adjustedCriteria;
    
    console.log("(determinedDifficulty === difficulty) = ", (determinedDifficulty === difficulty));
    if (determinedDifficulty === difficulty) {
      adjustedCriteria = criteria;
    } else {
      adjustedCriteria = adjustCriteria(criteria, difficulty);
    }

    const numToRemove = adjustedCriteria.emptyCellCount - adjustedCriteria.fixedNumberCount / 2;

    if (numToRemove >= 0) {
      console.log("removeNumber");
      str8ts = removeNumbers(str8ts, difficulty, numToRemove).grid; // Hier werden die Zahlen entfernt
      str8ts = removeBlackNumbers(str8ts, difficulty);
      console.log("str8ts = ", str8ts);
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

const determineDifficulty = (str8ts) => {
  console.log("Enter determineDifficulty()");

  const emptyCellCount = str8ts.flat().filter(cell => cell === 0).length;
  const fixedNumberCount = str8ts.flat().filter(cell => cell > 0).length;
  
  // Hier könntest du die anderen Kriterien hinzufügen und berücksichtigen
  
  // Beispiel: Anzahl der langen Straßen
  const longStreetsCount = countLongStreets(str8ts);

  // Beispiel: Prüfen auf Symmetrie
  const isSymmetrical = checkSymmetry(str8ts);

  // Beispiel: Verhältnis zwischen schwarzen und weißen Feldern
  const blackToWhiteRatio = calculateBlackToWhiteRatio(str8ts);

  // Hier kombinierst du die verschiedenen Kriterien nach deiner Einschätzung
  // und gibst eine Schwierigkeitsstufe zurück

  if (emptyCellCount <= 25 && fixedNumberCount >= 35 && longStreetsCount >= 4) {
    return 'extreme';
  } else if (emptyCellCount <= 30 && fixedNumberCount >= 30 && isSymmetrical) {
    return 'hard';
  } else if (emptyCellCount <= 35 && fixedNumberCount >= 2) {
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

const fillBlockedFields = (grid) => {
  console.log("Enter fillBlockedFields()");

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] < 0 && Math.random() < 0.002) { // Hier die Wahrscheinlichkeit ändern
        const blockedNumber = -grid[i][j];
        grid[i][j] = blockedNumber;
      }
    }
  }

  return grid;
};


const calculateBlackToWhiteRatio = (str8ts) => {
  console.log("Enter calculateBtoWRatio()");

  const blackCount = str8ts.flat().filter(cell => cell < 0).length;
  const whiteCount = str8ts.flat().filter(cell => cell === 0).length;

  console.log("blackCount / whiteCount + 1 = ", blackCount / (whiteCount + 1));

  return blackCount / (whiteCount + 1);
};

const removeNumbers = (grid, difficulty, numToRemove) => {
  console.log("Enter removeNumbers()");

  const removedNumbers = [];

  for (let i = 0; i < numToRemove; i++) {
    let row, col;
    do {
      row = Math.floor(Math.random() * 9);
      col = Math.floor(Math.random() * 9);
    } while (grid[row][col] === 0);

    const temp = grid[row][col];
      removedNumbers.push(temp);
  }

  console.log("Removed Numbers: ", removedNumbers);

  return { grid, removedNumbers };
};
const removeBlackNumbers = (grid, difficulty) => {
  console.log("Enter removeBlackNumbers() with grid & difficulty = ", grid, difficulty);
  
  let numToRemove = 0;
  switch (difficulty) {
    case 'easy':
      numToRemove = 5;
      break;
    case 'medium':
      numToRemove = 7;
      break;
    case 'hard':
      numToRemove = 8;
      break;
    case 'extreme':
      numToRemove = 9;
      break;
    case 'melina':
      numToRemove = 9;
      break;
    default:
      numToRemove = 30;
  }

  let removedCount = 0;
  for (let i = 0; (removedCount < numToRemove && i < grid.length); i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    console.log("grid[row][col] = ", grid[row][col]);
    if (grid[row][col] < 0) { // Überprüfe, ob das Feld schwarz ist
      grid[row][col] = 0;
      removedCount++;
    }
  }

  return grid;
};



const generateStr8ts = (difficulty) => {
  console.log("Enter generateStr8ts()");

  const pattern = generatePattern();
  const filledGrid = fillBlockedFields(fillWhiteFields(pattern));

  const finalGrid = applyCriteriaWithRetries(filledGrid, difficulty, 100);
  console.log("finalGrid = ", finalGrid);
  return finalGrid;
};

export default generateStr8ts;
