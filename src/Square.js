import React from 'react'
import PropTypes from 'prop-types'

export default class Square extends React.Component {
  static get propTypes () {
    return {
      value: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      selected: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      <button className={this.props.selected ? 'square red' : 'square black'} onClick={this.props.onClick}>
        {this.props.value}
      </button>
    )
  }
}
