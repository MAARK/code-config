/**
 * The purpose of this file is just to test out the ESLint rules
 */

import React from 'react'
import PropTypes from 'prop-types'

function FooComponent({ time, className }) {
  return <div className={className}>FooComponent Component: {time}</div>
}

FooComponent.defaultProps = {
  className: ''
}

FooComponent.propTypes = {
  time: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default FooComponent
