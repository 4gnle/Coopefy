import React from 'react'

// Styles
import './ActionsView.css'

// UI
import Button from '../../UI/Button'

import {Link} from 'react-router-dom'

const ActionsView = () => {
  return (
    <div>
    <div className='av-box'>
      <div className='av-buttons'>
        <h3>What are you looking for?</h3>
        <Link to='/create-project'><Button>
        Create a Project
        </Button></Link>
        <Button>
        Find Projects
        </Button>
        <Link to='/people'><Button>
        Find People
        </Button></Link>
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
