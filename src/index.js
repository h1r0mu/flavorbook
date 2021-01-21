import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  const highlight = props.highlight ? {backgroundColor: "yellow"} : {}
  return (
    <button 
      style={highlight}
      className="square" onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    const highlight = this.props.winCells && this.props.winCells.includes(i);
    return (
      <Square
        key={i}
        highlight={highlight}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    let squares = [];
    for (let i = 0; i < 3; i++) {
      let rows =  [];
      for (let j = 0; j < 3; j++) {
        rows.push(this.renderSquare(i * 3 + j));
      }
      squares.push(
        <div key={i} className="board-row">
        {rows}
        </div>
      );
    }

    return (
      <div>
      {squares}
      </div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          move: null
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      reverse: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          move: indexToCoord(i),
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  toggleOrder() {
    this.setState({
      reverse: !this.state.reverse
    });
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const filled = current.squares.every(v => v); 

    let moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + `(${step.move.col}, ${step.move.row})`:
        'Go to game start';
      const style = (move === this.state.stepNumber) ? {fontWeight: "bold"} : {};
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}><p style={style}>{desc}</p></button>
        </li>
      );
    });
    if (this.state.reverse) {
      moves = moves.reverse();
    }

    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    } else if (filled) {
      status = "Draw";
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winCells={winner}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
      <button
      onClick={() => this.toggleOrder()}>
      toggleOrder
      </button>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function indexToCoord(i) {
    return {
      col: i % 3,
      row: Math.floor(i / 3)
    }
}
