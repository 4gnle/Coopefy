import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'

import './Alerts.css'

const Backdrop = (props) => {
  return(
    <div className='backdrop' onClick={props.validationState}></div>
  )
}

const Alert = (props) => {
  return (
  <div className='alert'>
    <header>
      <h2>{props.error}</h2>
    </header>
    <p>Name or age are wrong</p>
    <button
    onClick={props.validationState}
    >Okay</button>
  </div>
  )
}

const Alerts = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop validationState={props.validationState}/>, document.getElementById('backdrop-root'))}

      {ReactDOM.createPortal(<Alert validationState={props.validationState} error={props.error}/>, document.getElementById('alert-root'))}
    </Fragment>
  )
}

export default Alerts
