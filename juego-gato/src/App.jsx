
import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

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
        const newWinner = checkWinnerFrom( newBoard )
        if( newWinner ) {
            confetti();
            setWinner( newWinner )
        } else if ( checkEndGame( newBoard ) ) {
            setWinner( false )
        }

        // Cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
        setTurn( newTurn )
    }

    // Resetamos juego, reicio de estados a su estado inicial
    const resetGame = () => 
    {
        setBoard( Array(9).fill(null) )
        setTurn( TURNS.X )
        setWinner( null )
    }

    return (
        <main className="board">
            <h1>Gato 🐈‍⬛</h1>
            <button onClick={resetGame}>Restart</button>
            <section className="game">
                {
                    board.map( ( square, index ) => {
                        return (
                            <Square key={index} index={index} updateBoard={updateBoard}>
                                { square }
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

            <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
        </main>
    )
}

export default App;