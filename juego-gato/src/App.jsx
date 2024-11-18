
import { useState } from 'react'
import './App.css'

const TURNS = {
    X: 'X',
    O: 'O'
}

const Square = ({ children, isSelected, updateBoard, index }) => 
{
    const className = `square ${ isSelected ? 'is-selected' : '' }`

    const handleClick = () => {
        updateBoard( index )
    }

    return (
        <button onClick={ handleClick } className={ className }>
            { children }
        </button>
    )
}

// Combinaciones ganadoras
const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function App() 
{
    // Manejo de estados
    const [ board, setBoard ]       = useState( Array(9).fill(null) )
    const [ turn, setTurn ]         = useState( TURNS.X )
    const [ winner, setWinner ]     = useState( null )
    
    const updateBoard = ( index ) => 
    {
        // Si la casilla ya está ocupada o hay ganador, no se puede hacer nada
        if( board[index] || winner ) return

        // Actualizar el tablero
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard( newBoard )

        // Comprobar si hay ganador
        const newWinner = checkWinner( newBoard )
        if( newWinner ) {
            setWinner( newWinner )
            return
        }

        // Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn( newTurn )
    }

    // Comprobar si hay ganador
    const checkWinner = ( boardToCheck ) => 
    {
        for( const combo of WINNER_COMBOS ) 
        {
            const [ a, b, c ] = combo

            if( boardToCheck[a] && 
                boardToCheck[a] === boardToCheck[b] && 
                boardToCheck[a] === boardToCheck[c] 
            ) {
                return boardToCheck[a]
            }
        }

        return null
    }

    return (
        <main className="board">
            <h1>Gato 🐈‍⬛</h1>
            <section className="game">
                {
                    board.map( (_, index) => {
                        return (
                            <Square 
                                key={index} 
                                index={index} 
                                updateBoard={updateBoard}
                            >
                            { board[index] }
                            </Square>
                        )
                    })
                }
            </section>

            <section className='turn'>
                <Square isSelected={ turn === TURNS.X }>
                    { TURNS.X }
                </Square>
                <Square isSelected={ turn === TURNS.O }>
                    { TURNS.O }
                </Square>
            </section>
        </main>
    )
}

export default App;