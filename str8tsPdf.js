// str8tsPDF.js
console.log("Enter str8tsPdf");

import { jsPDF } from 'jspdf';
import generatePattern from './generatePattern.js';
import date from 'date-and-time';

const generatePDF = (difficulty) => {
    const grid = generatePattern(difficulty);
  
    const doc = new jsPDF();
    doc.setFontSize(12);
  
    const startX = 10;
    const startY = 10;
    const cellSize = 20;
    const cellPadding = 2;
    
    doc.setFontSize(26); // Ändert die Schriftgröße auf 14
    doc.setFont(undefined, 'bold'); // Setzt den Text auf fett

    //console.log("grid.length grid: ", grid);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const xPos = startX + j * cellSize;
        const yPos = startY + i * cellSize;
        const text = grid[i][j].toString();
        const textWidth = doc.getStringUnitWidth(text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
        const textHeight = doc.internal.getLineHeight();
        const xTextPos = xPos + (cellSize - cellPadding) / 2;
        const yTextPos = yPos + (cellSize + cellPadding * 2) / 2;
        if (grid[i][j] > 0) {
         // console.log("str8tsPdf grid[i][j] > 0 ", grid[i][j]);
          doc.setFillColor(255);
          doc.rect(xPos, yPos, cellSize, cellSize, 'F');
          doc.setTextColor(0);
          doc.text(text, xTextPos, yTextPos, {align: 'center'});
          doc.setLineWidth(0.5); // Setzt die Linienbreite zurück auf 0.1 (oder eine geeignete Dicke)
        } else if (grid[i][j] < 0) {
          const number = grid[i][j] * (-1) - 1;
          doc.setFillColor(0);
          doc.rect(xPos, yPos, cellSize, cellSize, 'F');
          //console.log("str8tsPdf grid[i][j] < 0 number = ", number);
          if (number !== 0) {
            doc.setTextColor(255);
            doc.text(number.toString(), xTextPos, yTextPos, 'center'); }
        } else {
            doc.setFillColor(255);
          doc.rect(xPos, yPos, cellSize, cellSize);
        }
      }
    }
    // Draw the grid lines
for (let i = 0; i <= grid.length; i++) {
    const y = startY + i * cellSize;
    doc.line(startX, y, startX + cellSize * grid[0].length, y);
  }
  
  for (let j = 0; j <= grid[0].length; j++) {
    const x = startX + j * cellSize;
    doc.line(x, startY, x, startY + cellSize * grid.length);
  }
    const now = new Date();
    const dateString = date.format(now, 'YYYYMMDD__HH_mm_ss');
    const docNameString = ('str8ts_puzzle_withDifficulty:' + difficulty.toString() + dateString + '.pdf');
    console.log(docNameString);
    doc.save(docNameString);
  };
  

export default generatePDF;
