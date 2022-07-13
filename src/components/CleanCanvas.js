import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CleanButton extends Component {

  constructor(props) {
    super(props)
  }
  updateState () {
    window.location.reload()
  }

  render () {
    const buttonClassName = "Trash"
    const iconClassName = `fa fa-${this.props.icon}`

    return (
      <button className={buttonClassName} onClick={this.props.updateState} title={this.props.title}><i className={iconClassName}></i></button>
    )
  }
}

CleanButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  handleClick: PropTypes.func,
}

export default CleanButton
