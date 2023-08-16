import { useState } from "react";

export const Game = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState(false)
    
    const [count, setCount] = useState(0)
    const changeValue = (id) => {
        if (winner === '') {
            setCount(count + 1)
            const newSquare = squares
            newSquare[id] = !turn ? 'X' : 'O'
            setTurn(!turn)
            setSquares(newSquare)
            checkForWinner()
        }
    }

    const renderSquares = (id) => {
        return (
            <>
                {
                    squares[id] !== null ?
                    <div className="square nonClickable">  
                        {
                            squares[id] === 'X' ?
                            <img src="https://icones.pro/wp-content/uploads/2022/05/icone-fermer-et-x-vert.png" alt="X" />
                            : <img src="https://static.vecteezy.com/system/resources/previews/016/017/076/non_2x/red-circle-red-dot-icon-free-png.png" alt="O" />
                        }            
                    </div>
                    :
                    <div className={winner === '' ? "square" : "square nonClickable"} onClick={() => changeValue(id)}>
                    </div>
                }
            </>
        )
    }
    const [winner, setWinner] = useState('')
    const checkForWinner = () => {
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
                setWinner(squares[a])
            }
        }
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setWinner('')
        setCount(0)
    }

    return (
        <div className="gameContainer">
            <span className="turn">TURN: {!turn ? 'X' : 'O'}</span>
            <div className="game">
                <div>
                    <div className="cell">{renderSquares(0)}</div>
                    <div className="cell">{renderSquares(1)}</div>
                    <div className="cell">{renderSquares(2)}</div>
                </div>
                <div>
                    <div className="cell">{renderSquares(3)}</div>
                    <div className="cell">{renderSquares(4)}</div>
                    <div className="cell">{renderSquares(5)}</div>
                </div>
                <div>
                    <div className="cell">{renderSquares(6)}</div>
                    <div className="cell">{renderSquares(7)}</div>
                    <div className="cell">{renderSquares(8)}</div>
                </div>
            </div>
            <div className="textContainer">
                {
                    winner !== '' ?
                    <div className="resultsContainer">
                        <span>Congratulations!</span>
                        <span>The winner is: {winner}</span>
                        <button onClick={resetGame}>PLAY AGAIN</button>
                    </div>
                    : <></>
                }
                {
                    count === 9 && winner === '' ?
                    <div className="resultsContainer">
                        <span>Draw!</span>
                        <button onClick={resetGame}>PLAY AGAIN</button>
                    </div>
                    : <></>
                }
            </div>
        </div>
    )
}
