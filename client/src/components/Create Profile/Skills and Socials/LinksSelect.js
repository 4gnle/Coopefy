import React from 'react'

//UI and Styles
import './LinksSelect.css'

const LinksSelect = (props) => {
  return (
  <div>
    <div onClick={props.unSelectLinks} className='link-backdrop'>
    </div>

      <div className='links-select'>
        <div className='links-box'>
          <div className='links-inputs'>

          <header>Add Links</header>

          <i className="fab fa-product-hunt"></i>
          <input></input>
          <br></br>
          <i className="fab fa-github-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-twitter-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-facebook-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-instagram-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-behance-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-dribbble-square"></i>
          <input></input>
          <br></br>
          <i className="fab fa-linkedin-square"></i>
          <input></input>

          </div>
        </div>
      </div>
  </div>
  )
}

export default LinksSelect;
