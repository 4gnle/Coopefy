import React, {Fragment} from 'react'

//Redux
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import {removeAlert} from '../../redux/actions/alert'

import './Alert.css'

const Alerts = ({ removeAlert, alerts }) => {
  return (
    <div>
     {alerts !== null &&
     alerts.length > 0 &&
     alerts.map(alert =>(

      <Fragment>
        <div className='backdrop' onClick={removeAlert}></div>

        <div className='alert'>
          <div key={alert.id} className={`alert-${alert.alertType}`}>
           <header>{alert.msg}</header>
           <p>Make sure passwords are the same</p>
           <button onClick={removeAlert}>Okay</button>
         </div>
        </div>

      </Fragment>
    ))}
  </div>
  )
};



const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps, {removeAlert})(Alerts)
