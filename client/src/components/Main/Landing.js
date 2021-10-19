import React from 'react'

//UI and CSS
import styled from 'styled-components';
import Button from '../UI/Button'

const Landing = () => {
  return (
    <LandingHero>
      <LandingCopy>
        <CopyTop>
          collaborate and get help in web3 projects
        </CopyTop>
        <CopyBottom>
          Enjoy everything web3 stands for:
        </CopyBottom>
        <ul>
          <CopyList>
          one-click sign up with Metamask
          </CopyList>
          <CopyList>
          use real or pseudonymous information
          </CopyList>
          <CopyList>
          work on exciting and challenging projects
          </CopyList>
          <CopyList>
          get rewards for your help
          </CopyList>
          <CopyList>
          share your knowledge and experiences
          </CopyList>
          <CopyList>
          meet the most talented people
          </CopyList>
        </ul>
      </LandingCopy>
      <FindPeopleButton/>
      <FindProjectsButton/>

    </LandingHero>
  )
}

export default Landing

const LandingHero = styled.div`
  width: 100%;
  height: 100%;
`

const LandingCopy = styled.div`
  position: relative;
  margin-left: 10rem;
  max-width: 60%;
`
const CopyTop = styled.h1`
`
const CopyBottom = styled.h2`
color: gray;

`
const CopyList = styled.li`
  margin: 10px;
  margin-left: -25px;
`

const LandingButtons = styled.div`

`
const FindPeopleButton = styled(Button)`

`
const FindProjectsButton = styled(Button)`

`
