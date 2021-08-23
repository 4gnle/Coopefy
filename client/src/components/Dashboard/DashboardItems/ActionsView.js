import React from 'react'

// Styles
import './ActionsView.css'

// UI
import Button from '../../UI/Button'

const ActionsView = () => {
  return (
    <div>
    <h1 style={{textAlign: 'center', marginBottom: '0px', marginLeft: '0px', marginRight: '0px'}}>Dashboard</h1>
    <div className='av-box'>
      <div className='av-buttons'>
        <h3>What are you looking for?</h3>
        <Button>
        Create a Project
        </Button>
        <Button>
        Find Projects
        </Button>
        <Button>
        Find People
        </Button>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>


      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>

      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>


      <div className='av-box-list-item'>
        <div className='av-profile-picture'>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ActionsView
