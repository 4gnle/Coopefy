import React, {useEffect, useState} from 'react'

//Components
import PeopleItem from './PeopleItem';

//UI
import Spinner from '../../UI/Spinner';
import styled from 'styled-components';

//Redux and Router
import {getPeople} from '../../../redux/actions/profile';
import {useSelector, useDispatch} from 'react-redux';

const People = () => {

  const [peopleReady, setPeopleReady] = useState(false);

  const dispatch = useDispatch();

  const peopleData = useSelector(state => state.profile);

  const {profiles, loading} = peopleData;

  useEffect(() => {
    gettingPeople();
  }, [getPeople]);

  const gettingPeople = async () => {
    await dispatch(getPeople());
    setPeopleReady(true)
  }

  return (
    <PeopleBox>
      <PeopleTop>
        <h1>People</h1>
        <p>
          <i class="fas fa-user-friends"></i>{' '}
          Meet amazing people
        </p>
    {loading && !peopleReady ? <Spinner/> :
        <PeopleGrids>
        {profiles.length > 0 ?
        (profiles.map((profile, index) =>
          <div>
            {profile.status &&
            <PeopleItem
              key={index}
              profileData={profile}
            />}
          </div>
        )
      ) : <Spinner/>}
        </PeopleGrids>
    }
    </PeopleTop>
  </PeopleBox>
)
}

export default People;

const PeopleBox = styled.div`
  padding: 0.5rem;
  background: #C4C4C4;
  background-color: white;
  overflow: hidden;
  height: auto;
  z-index: 1;

  @media (max-width: 650px) {
    position: absolute;
    top: 10vh;
    width: fit-content;
    box-shadow: none;
  }
`;

const PeopleTop = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

const PeopleGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 2fr);
  grid-auto-rows: fit-content;
  grid-gap: 1rem;

  @media (max-widtH: 900px) {
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    grid-auto-rows: fit-content;
  };

  @media (max-width: 650px) {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
      grid-auto-rows: fit-content;
      grid-gap: 1rem;
  };
`;
