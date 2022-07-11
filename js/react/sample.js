/**
 * The purpose of this file is just to test out the ESLint rules
 */
import React from 'react'
import PropTypes from 'prop-types'

const FooComponent = ({ className }) => (
  <a className={className}>FooComponent Component</a>
)

FooComponent.defaultProps = {
  className: ''
}

FooComponent.propTypes = {
  className: PropTypes.string
}

export default FooComponent
