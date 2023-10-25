import { jsPDF } from 'jspdf';
import generateStr8ts from './str8tsGenerate.js';
console.log("started with:", generateStr8ts);
const generatePDF = (difficulty) => {
  const grid = generateStr8ts(difficulty);

  const doc = new jsPDF();
  doc.setFontSize(12);

  const startX = 10;
  const startY = 10;
  const cellSize = 20;
  const cellPadding = 2;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const xPos = startX + j * cellSize;
      const yPos = startY + i * cellSize;

      if (grid[i][j] !== 0) {
        if (grid[i][j] < 0) { // Wenn Zahl blockiert ist
          doc.setFillColor(0); // Schwarze Farbe
          doc.rect(xPos, yPos, cellSize, cellSize, 'F'); // Füllen
          const blockedNumber = -grid[i][j];
          doc.setTextColor(255); // Weiße Schriftfarbe
          doc.text(blockedNumber.toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        } else {
          doc.rect(xPos, yPos, cellSize, cellSize);
          doc.text(grid[i][j].toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        }
      } else {
        if (Math.random() < 0.2) { // Wahrscheinlichkeit für eine schwarze Zelle mit Zahl
          const randomNumber = Math.floor(Math.random() * 8) + 1; // Zufällige Zahl von 1 bis 8
          doc.setFillColor(0); // Schwarze Farbe
          doc.rect(xPos, yPos, cellSize, cellSize, 'F'); // Füllen
          doc.setTextColor(255); // Weiße Schriftfarbe
          doc.text(randomNumber.toString(), xPos + cellPadding, yPos + cellSize - cellPadding);
        } else {
          doc.rect(xPos, yPos, cellSize, cellSize);
        }
      }
    }
  }
  console.log("doc");
  doc.save('str8ts_puzzle.pdf');
  console.log("saved");
};

export default generatePDF;
