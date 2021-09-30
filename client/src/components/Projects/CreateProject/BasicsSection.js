import React, {useState} from 'react'

// UI & CSS
import './CreateProject.css'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const BasicsSection = () => {
  return (
    <div>
    <div className='cp-top'>
      <h1>Project Basics</h1>
      <h2><em>Let everyone know what you're looking for!</em></h2>
    </div>

    <div className='cp-description'>
      <p>Follow these guidelines for project creation</p>
      <ul>
        <li>Choose a <em>clear</em> and <em>brief</em> project name {'('}<strong>what</strong> you are building and <strong>who</strong> you need{')'}</li>
        <br/>
        <li>Write a <em>comprehensive</em> description {'('}describe your project in-depth, explain your <b>ideas</b>, <b>timeframe</b>, <b>guidelines</b>, and <b>requirements</b>{')'}</li>
        <br/>
        <li>Add relevant links to resources and examples. Make it clear <b>what</b> you want done and <b>how</b>.</li>
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

export default BasicsSection
