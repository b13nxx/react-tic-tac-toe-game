import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'

export default class Board extends React.Component {
  static get propTypes () {
    return {
      squares: PropTypes.array.isRequired,
      onClick: PropTypes.func.isRequired,
      winPosition: PropTypes.array.isRequired
    }
  }

  render () {
    return (
      // eslint-disable-next-line react/jsx-fragments
      <>
        {Array(3).fill(null).map((el, i) => (
          <div className='board-row' key={i}>
            {Array(3).fill(null).map((el, j) =>
              (
                <Square
                  key={j}
                  selected={this.props.winPosition.includes((i + j) + (i * 2))}
                  value={this.props.squares[(i + j) + (i * 2)]}
                  onClick={() => this.props.onClick((i + j) + (i * 2))}
                />
              )
            )}
          </div>
        ))}
      </>
    )
  }
}
