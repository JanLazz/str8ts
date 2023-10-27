// str8tsPDF.js
console.log("Enter str8tsPdf");

import { jsPDF } from 'jspdf';
import generateStr8ts from './str8tsGenerate.js';

const generatePDF = (difficulty) => {
  const grid = generateStr8ts(difficulty);

  const doc = new jsPDF();
  doc.setFontSize(12);

  const startX = 10;
  const startY = 10;
  const cellSize = 20;
  const cellPadding = 2;

  
  console.log("grid.length grid: ", grid);
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const xPos = startX + j * cellSize;
      const yPos = startY + i * cellSize;

      if (grid[i][j] !== 0) {
        if (grid[i][j] < 0) {
          doc.setFillColor(0);
          doc.rect(xPos, yPos, cellSize, cellSize, 'F');
          const blockedNumber = -grid[i][j];
          doc.setTextColor(255);
          doc.text(blockedNumber.toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        } else {
          doc.rect(xPos, yPos, cellSize, cellSize);
          doc.text(grid[i][j].toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        }
      } else {
        if (Math.random() < 0.95) {
          const randomNumber = Math.floor(Math.random() * 8) + 1;
          doc.setFillColor(0);
          doc.rect(xPos, yPos, cellSize, cellSize, 'F');
          doc.setTextColor(255);
          doc.text(randomNumber.toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        } else {
          doc.rect(xPos, yPos, cellSize, cellSize);
        }
      }
    }
  }

  doc.save('str8ts_puzzle.pdf');
};

export default generatePDF;
