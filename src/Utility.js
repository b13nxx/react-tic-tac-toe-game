export default {
  calculateWinner (squares) {
    const possibleWinPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < possibleWinPositions.length; i++) {
      const [a, b, c] = possibleWinPositions[i]
      if (squares[a] && squares[b] && squares[c] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return {
          winner: this.whoIs(squares[a]),
          position: possibleWinPositions[i]
        }
      }
    }

    return {
      winner: null,
      position: []
    }
  },
  getPosition (moves, step) {
    const squares = this.getMove(moves, step)
    let index = 0

    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) {
        index = i
        break
      }
    }

    return {
      row: Math.floor(index / 3),
      col: index % 3
    }
  },
  whoIs: char => char === 'X' ? 'Ben' : 'Alexa',
  whichChar: moves => moves.length % 2 === 0 ? 'O' : 'X',
  getMove: (moves, step) => moves[step].squares.map((square, i) => square !== moves[step - 1].squares[i] ? square : null)
}
