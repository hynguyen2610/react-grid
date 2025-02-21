import React, { Component } from "react";

// Cell component
class Cell extends Component {
  handleClick = () => {
    // Notify the parent (Grid) component about the cell click
    this.props.onClick(this.props.row, this.props.col);
  };

  render() {
    const { backgroundColor } = this.props;
    return (
      <div
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: backgroundColor,
          border: "1px solid black",
        }}
        onClick={this.handleClick}
      />
    );
  }
}

// Grid component (8x8 grid)
class Grid extends Component {
  constructor(props) {
    super(props);
    // Initializing an 8x8 grid with white background color for each cell
    this.state = {
      grid: Array(8)
        .fill()
        .map(() => Array(8).fill("white")),
      highlightedCells: [],
    };
  }

  handleCellClick = (row, col) => {
    // Create a new grid and toggle the color of the clicked cell
    const newGrid = this.state.grid.map((r, rIdx) =>
      rIdx === row
        ? r.map((color, cIdx) =>
            cIdx === col ? (color === "white" ? "blue" : "white") : color
          )
        : r
    );

    // Collect the coordinates of blue cells
    const highlightedCells = [];
    newGrid.forEach((row, rowIndex) =>
      row.forEach((cellColor, colIndex) => {
        if (cellColor === "blue") {
          highlightedCells.push(`(${rowIndex}, ${colIndex})`);
        }
      })
    );

    this.setState({ grid: newGrid, highlightedCells });
  };

  render() {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 50px)", gap: "2px" }}>
        {this.state.grid.map((row, rowIndex) =>
          row.map((cellColor, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              backgroundColor={cellColor}
              onClick={this.handleCellClick}
            />
          ))
        )}
        {/* Pass highlightedCells to the Announcement component */}
        <Announcement highlightedCells={this.state.highlightedCells} />
      </div>
    );
  }
}

class Announcement extends Component {
  render() {
    return (
      <div>
        <h1>Current highlighted cells:</h1>
        {this.props.highlightedCells.length > 0 ? (
          this.props.highlightedCells.map((cell, index) => (
            <div key={index}>{cell}</div>
          ))
        ) : (
          <div>No cells are highlighted</div>
        )}
      </div>
    );
  }
}

// Main App component
class App extends Component {
  render() {
    return (
      <div>
        <h1>8x8 Grid Board</h1>
        <Grid />
      </div>
    );
  }
}

export default App;
