import React, {useState} from 'react'

// UI & CSS
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const DetailsSection = ({goBack}) => {
  const [nextPage1, setNextPage] = useState(false);

  const nextPage = () => {
    setNextPage(true);
  }

  return (
    <div className='create-project-box'>
      <div className='cp-top'>
        <h1>Project Details</h1>
        <h2><em>Who you want and what you're offering</em></h2>
      </div>

      <div className='cp-description'>
        <p>Follow these guidelines:</p>
        <ul>
          <li>Choose the ideal <em>skills</em> of the person you're looking for.</li>
          <br/>
          <li>Make it clear what you're collaborators get from working on this project.</li>
          <br/>
          <li>Decide whether it's a remote or location-specific project</li>
        </ul>
        <p>Catch your perfect collaborator attention's with a great first impression!</p>
      </div>

        <div className='cp-input-section'>
          <h2 className='cp-input-titles'>Pick the best name for your project</h2>
          <input
            placeholder='e.g. Looking for Smart Contract Developer for an NFT Project'
          />

          <h2 className='cp-input-titles'>Describe your project clearly</h2>
          <textarea
            placeholder='e.g. I am an NFT artist looking for a Solidity developer with experience in NFTs (minting, airdrops, etc.)...'
          />
        </div>

      <div className='cp-button-section'>
        <Button
          onClick={goBack}
          className="bad"
        >Cancel</Button>
        <Button
          onClick={nextPage}
          className='primary'
        >Continue</Button>
    </div>
  </div>
  )
}

export default DetailsSection
