// generatePattern.js

const generatePattern = () => {
    console.log("Enter generatePattern()");

    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  
    const blackRow = Math.floor(Math.random() * 9);
    const blackCol = Math.floor(Math.random() * 9);
    grid[blackRow][blackCol] = -1;
  
    for (let i = 0; i < 10; i++) {
      const randomRow = Math.floor(Math.random() * 9);
      const randomCol = Math.floor(Math.random() * 9);
      if (grid[randomRow][randomCol] !== -1) {
        grid[randomRow][randomCol] = -1;
      }
    }
    console.log("Grid: ", grid);
    return grid;
  };
  
  export default generatePattern;
  