import React from 'react'

import './Error404.css'

import errorimage from './Error404.png'

const Error404 = () => {
  return (
    <div className='error-404'>
      <h1>There's nothing here!</h1>
      <img src={errorimage}/>
    </div>
  )
}

export default Error404
