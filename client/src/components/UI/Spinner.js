import React from 'react'

import spinner from './spinner.gif'

const Spinner = () => {
  return (
    <div>
      <img
      style={{position: 'fixed', width: '150px', margin: 'auto', top: '0', left: '0', right: '0', bottom: '0'}}
      alt= 'loading...'
      src={spinner}/>    </div>
  )
}

export default Spinner
