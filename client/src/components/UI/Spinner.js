import React from 'react'

import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <div>
      <img
      style={{width: '150px', margin: 'auto', top: '500px', display: 'block'}}
      alt= 'loading...'
      src={spinner}/>    </div>
  )
}

export default Spinner
