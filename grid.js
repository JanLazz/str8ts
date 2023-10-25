import React from 'react';
import './Str8tsGrid.css'; // Importiere die CSS-Datei

class Str8tsGrid extends React.Component {
  // ...
  
  render() {
    return (
      <div className="str8ts-grid">
        {this.state.grid.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <div className="cell" key={colIndex}>
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Str8tsGrid;
