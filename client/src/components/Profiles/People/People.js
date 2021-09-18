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
    profiles,
    username,
    profileimage,
    bio,
    location,
    profilename,
    status,
    website,
    loading} }) => {

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <div className='people-box'>
    {loading ? <Spinner/> :
      <>
        <div className='pb-top'>
          <h1>People</h1>
          <p>
            <i className="fab fab-connectdevelop"></i>
            Meet amazing people
          </p>
        </div>

        <div>
        {profiles.length > 0 ? (     profiles.map(profile =>

          <PeopleItem
            username={profile.username}
            profileimage={profile.profileimage}
            bio={profile.bio}
            location={profile.location}
            profilename={profile.profilename}
            status={profile.status}
            website={profile.website}
          />
        )
        ) : <h4>There is no profile yet</h4>}
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
