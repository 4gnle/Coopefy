import React, {useEffect} from 'react'

import './People.css'

//Components
import PeopleItem from './PeopleItem'

//UI
import Spinner from '../../UI/Spinner'
import Button from '../../UI/Button'

//Redux and Router
import {getPeople} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

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

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <div className='people-box'>
    {loading && !profiles ? <Spinner/> :
      <>
        <div className='pb-top'>
          <h1>People</h1>
          <p>
            <i class="fas fa-user-friends"></i>{' '}
            Meet amazing people
          </p>
        </div>

        <div className='people-grids'>
        {profiles.length > 0 ? (profiles.map(profile =>
          <>
          {profile.profilename && profile.profileimage ?
            <>
          <PeopleItem
            username={profile.username}
            bio={profile.bio}
            location={profile.location}
            profilename={profile.profilename}
            profileimage={profile.profileimage}
            status={profile.status}
            skills={profile.skills}
            socialLinks={profile.sociallinks}
            website={profile.website}
            sociallinks={profile.sociallinks}
            id={profile._id}
          />
          </> : null}</>
        )
      ) : <h4 style={{textAlign: 'center'}}>There is no profile yet</h4>}
        </div>
      </>
    }
  </div>
)
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getPeople})(People)
