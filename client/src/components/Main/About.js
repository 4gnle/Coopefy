import React, {Fragment, useRef, useState, useEffect} from 'react'

import './MainC.css'

import {deleteImage, getProfileImage, profileImage} from '../../redux/actions/profile';
import {connect} from 'react-redux';

const About = ({profile: { loading, image }, profileImage, getProfileImage, deleteImage}) => {

  const [imagePrev, setImagePrev] = useState();

  useEffect(() => {
    if (!image) getProfileImage();
    if (!loading && image) {
      // const image1 = atob(image)
      // setImagePrev(image1);
      console.log(image);
    }
  }, [getProfileImage, loading, image]);

  return (
    <div style={{display: 'inline', float: 'none', marginLeft: '0px', marginRight: '0px', top: '100px'}}>
      <img src={URL.createObjectURL(image)}/>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfileImage, profileImage})(About);
