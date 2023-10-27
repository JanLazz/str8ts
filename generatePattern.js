const generatePattern = () => {
    console.log("Enter generatePattern()");
  
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    for (let i = 0; i < 20; i++) {
      const randomRow = Math.floor(Math.random() * 9);
      const randomCol = Math.floor(Math.random() * 9);
      const randomValue = Math.random() < 0.9 ? -1 : Math.floor(Math.random() * 9) + 1; // 50% Chance für -1, sonst zufällige Zahl von 1 bis 9
      grid[randomRow][randomCol] = randomValue;
    }
  
    console.log("Grid: ", grid);
    return grid;
  };
  
  export default generatePattern;
  