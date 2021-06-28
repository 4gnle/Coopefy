import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'

//Redux
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

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

const Alerts = ({ alerts }) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop validationState={props.validationState}/>, document.getElementById('backdrop-root'))}

      {ReactDOM.createPortal(<Alert validationState={props.validationState} error={props.error}/>, document.getElementById('alert-root'))}
    </Fragment>
  )
}

const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect()(Alerts, Alert)
