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
    this.state = {
      grid: this.createGrid(props.rows, props.cols),
      highlightedCells: [],
    };
  }

  // Method to create the grid based on rows and cols
  createGrid = (rows, cols) => {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill("white"));
  };

  // Using getDerivedStateFromProps to update state when props change
  static getDerivedStateFromProps(nextProps, nextState) {
    if (
      nextProps.rows !== nextState.grid.length ||
      nextProps.cols !== nextState.grid[0].length
    ) {
      // Directly return the new grid and reset highlighted cells
      return {
        grid: Array(nextProps.rows)
          .fill()
          .map(() => Array(nextProps.cols).fill("white")),
        highlightedCells: [], // Reset highlighted cells when grid size changes
      };
    }
    return null; // No state changes
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
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${this.props.cols}, 50px)`,
            gap: "2px",
          }}
        >
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
        </div>
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

class Control extends Component {
  render() {
    return (
      <div>
        <h3>Configure grid size:</h3>
        <div>
          <label>Rows:</label>
          <input
            type="number"
            value={this.props.rows}
            onChange={(e) => this.props.onChangeRows(e.target.value)}
          />
        </div>
        <div>
          <label>Cols:</label>
          <input
            type="number"
            value={this.props.cols}
            onChange={(e) => this.props.onChangeCols(e.target.value)}
          />
        </div>
      </div>
    );
  }
}

// Main App component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: 8,
      cols: 8,
    };
  }

  onChangeCols = (value) => {
    this.setState({ cols: parseInt(value, 10) });
  };

  onChangeRows = (value) => {
    this.setState({ rows: parseInt(value, 10) });
  };

  render() {
    return (
      <div>
        <h1>8x8 Grid Board</h1>
        <Control
          rows={this.state.rows}
          cols={this.state.cols}
          onChangeCols={this.onChangeCols}
          onChangeRows={this.onChangeRows}
        />
        <Grid rows={this.state.rows} cols={this.state.cols} />
      </div>
    );
  }
}

export default App;
