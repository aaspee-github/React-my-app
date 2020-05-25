import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        let n = 0;
        let items = [];
        for (let a = 0; a < 3; a++) {
            let itemsInt = [];
            for (let b = 0; b < 3; b++) {
                itemsInt.push(this.renderSquare(n++))
            };
            items.push(<div className="board-row">{itemsInt}</div>);
        };

        return (
            <div>
                {items}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                ii: 0,
                rr: 0,
                cc: 0,
                XO: '',
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
<<<<<<< HEAD
                ii: history.length,
                rr: Math.trunc((i+3)/3),
                cc: (i % 3) + 1,
                XO:  squares[i],
=======
                // Store the index and Player of the latest moved square
                latestMoveSquare: i,
                XO: squares[i],
>>>>>>> 416eb2f4844a0183b614a147c28e0d67027e2af2
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const myJump = this.state.stepNumber;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const latestMoveSquare = step.latestMoveSquare;
            const XO = step.XO;
            const col = 1 + latestMoveSquare % 3;
            const row = 1 + Math.floor(latestMoveSquare / 3);
            const desc = move ?
<<<<<<< HEAD
                'Go to move #' + move + ' => ' + step.XO + ' en ('+ step.rr + ',' + step.cc + ')'  :
=======
                `Go to move #${move} x "${XO}" en (${col}, ${row}) ` :
>>>>>>> 416eb2f4844a0183b614a147c28e0d67027e2af2
                'Go to game start';
            const divStyle = (myJump === move) ? {fontWeight: 'bold'} : {fontWeight: 'normal'}; 
            return (
                <li key={move} >
                    <button style={divStyle} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner) {
            status = ' Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
