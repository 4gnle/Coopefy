import React, {useEffect, useState} from 'react'

import './People.css'

//Components
import PeopleItem from './PeopleItem'

//UI
import Spinner from '../../UI/Spinner'

//Redux and Router
import {getPeople} from '../../../redux/actions/profile';
import {connect} from 'react-redux';

const People = ({getPeople,
  profile: {
    _id,
    profiles,
    username,
    profileimage,
    bio,
    location,
    status,
    website,
    sociallinks,
    skills,
    loading} }) => {

  const [peopleReady, setPeopleReady] = useState(false);

  useEffect(() => {
    gettingPeople();
  }, [getPeople]);

  const gettingPeople = async () => {
    await getPeople();
    setPeopleReady(true)
  }

  return (
    <div className='people-box'>
      <div className='pb-top'>
        <h1>People</h1>
        <p>
          <i class="fas fa-user-friends"></i>{' '}
          Meet amazing people
        </p>
    {loading && !peopleReady ? <Spinner/> :
        <div className='people-grids'>
        {profiles.length > 0 ? (profiles.map(profile =>
          <>
          {profile.profilename && profile.username ?
          <PeopleItem
            key={_id}
            profile={profile}
          />
           : null}</>
        )
      ) : <Spinner/>}
        </div>
    }
    </div>
  </div>
)
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getPeople})(People)
