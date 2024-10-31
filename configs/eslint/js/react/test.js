import React from 'react'

import useTest from './useTest'

function FooComponent({ time, className }) {
  const { today, date } = useTest({ time })

  return (
    <div className={className}>
      FooComponent Component: {today} {date}
    </div>
  )
}

export default FooComponent
