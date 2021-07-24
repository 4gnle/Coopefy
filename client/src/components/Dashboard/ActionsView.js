import React from 'react'

// Styles
import './ActionsView.css'

// UI
import Button from '../UI/Button'

const ActionsView = () => {
  return (
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

    </div>
  )
}

export default ActionsView
