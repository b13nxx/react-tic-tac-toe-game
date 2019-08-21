import React from 'react'
import Board from './Board'
import Utility from './Utility'

export default class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      moves: [{
        squares: Array(9).fill(null)
      }]
    }
  }

  handleClick (i) {
    const moves = this.state.moves
    const current = moves[moves.length - 1]
    const squares = current.squares.slice()
    const hasWon = Utility.calculateWinner(squares)

    if (hasWon.winner || squares[i]) return

    squares[i] = Utility.whichChar(moves)

    this.setState({
      moves: moves.concat([{
        squares: squares
      }])
    })
  }

  undoTo (step) {
    const moves = this.state.moves
    this.setState({
      moves: moves.slice(0, step)
    })
  }

  render () {
    const moves = this.state.moves
    const current = moves[moves.length - 1]
    const hasWon = Utility.calculateWinner(current.squares)

    return (
      <div className='game'>
        <div className='game-board'>
          <div className='status'>
            {hasWon.winner ? 'Winner is ' + hasWon.winner + '!' : moves.length < 10 ? Utility.whoIs(Utility.whichChar(moves)) + ' is placing ' + Utility.whichChar(moves) + ':' : 'It\'s draw!'}
            {(moves.length === 10 || hasWon.winner) && <button onClick={() => this.undoTo(1)}>Restart?</button>}
          </div>
          <Board
            squares={current.squares}
            winPosition={hasWon.position}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>History:</div>
          <ol>
            {moves.length > 1 && moves.slice(1).map((move, step) => {
              const pos = Utility.getPosition(moves, step + 1)
              const char = Utility.whichChar(moves.slice(0, step + 1))

              return (
                <li key={step}>
                  <div>
                    {Utility.whoIs(char) + ' placed ' + char + ' at (' + pos.row + ', ' + pos.col + ')'}
                    <button onClick={() => this.undoTo(step + 1)}>Undo</button>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}
