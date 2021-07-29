import React from 'react'

//UI and Styles
import './LinksSelect.css'
import Button from '../../UI/Button'

const LinksSelect = (props) => {
  return (
  <div>
    <div onClick={props.unSelectLinks} className='link-backdrop'>
    </div>

      <div className='links-select'>
        <div className='links-box'>
        <header>Add Links</header>

          <div className='links-inputs'>
            <small>Add your ID or Username only</small>
            <br></br>
            <i className="fab fa-product-hunt"></i>
            <input></input>
            <br></br>
            <i className="fab fa-github-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-twitter-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-behance-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-dribbble-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-facebook-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-instagram-square"></i>
            <input></input>
            <br></br>
            <i className="fab fa-linkedin-square"></i>
            <input></input>
          </div>

            <div className='links-buttons'>
              <Button
                className='primary'>
                Add Links
              </Button>
              <Button
                className='bad'
                onClick={props.unSelectLinks}>
                Cancel
              </Button>
            </div>
        </div>
      </div>
  </div>
  )
}

export default LinksSelect;
