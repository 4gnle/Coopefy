import React, {Fragment, useRef, useState, useEffect} from 'react'
// import PropTypes from 'prop-types';

//Redux
import {deleteImage, getProfile, profileImage} from '../../redux/actions/profile';
import {connect} from 'react-redux';

import Button from '../UI/Button'
import Spinner from '../UI/Spinner'

import './ProfileImage.css'

const ImageUpload = ({profile: {signedprofile, loading, profileimage}, profileImage, getProfile, deleteImage}) => {

  const [file, setFile] = useState();
  const [previewURL, setpreviewURL] = useState();
  const [imagePrev, setImagePrev] = useState();
  const [prevURL, setprevURL] = useState({showPrev: false});
  const [valid, setValid] = useState();
  const [spinner, setSpinner] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!signedprofile && !imagePrev) getProfile();
    if (!loading && signedprofile.profileimage) {
      const imageBuffer = new Buffer(signedprofile.profileimage, 'base64');
      setImagePrev(imageBuffer);
    }
    // eslint-disable-next-line
  }, [loading, profileimage]);


  // Transforms the file into a URL
  useEffect(() => {
  if (!file) {
    return;
  }

  const filereader = new FileReader();

  filereader.onload = () => {
    setpreviewURL(filereader.result);
  }

  filereader.readAsDataURL(file);

  }, [file]);

  // This create the image preview from the input
  const imagePreview = (event) => {
    setprevURL({showPrev: true});
    let pickedFile;
    let fileIsValid = valid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile)
      setValid(true)
      fileIsValid = true;
      return;
    } else {
      setValid(false)
      // eslint-disable-next-line
      fileIsValid = false;
    }
  }

  const filePicker = () => {
    filePickerRef.current.click();
  }

  const submitImage = async (e) => {
    const formData = new FormData();
    formData.append("profileimage", file);
    e.preventDefault()
    setSpinner(true);
    await profileImage(formData)
    setSpinner(false);
  }

  const deleteFunc = (e) => {
    e.preventDefault();
    setprevURL({showPrev: false});
    setImagePrev(null)
    setFile(null);
    deleteImage();
  }

  const Buttons = () => {
    return (
    <Fragment>
      <Button
        className="button primary m"
        onClick={submitImage}
        title='Upload Image'>
        <i className="fas fa-upload"></i>
        </Button>

        <Button
        onClick={deleteFunc}
        className='button bad m'
        title='Delete Image'>
        <i className="fas fa-trash-alt">
        </i>
      </Button>
    </Fragment>)}

  return (

    <div>
      {spinner && (<Spinner/>)}
      <input
        type="file"
        ref={filePickerRef}
        accept='.jpeg,.jpg,.png'
        style={{display: "none"}}
        onChange={imagePreview}
      />

      <div className='image-upload.center'>
        <div  className='image-upload__preview'>

        {imagePrev ? (<img src={imagePrev} alt="Preview"/>) : previewURL && prevURL.showPrev ? (<img src={previewURL} alt="Preview"/>) :
          <Button
          className="button-image"
          type="button"
          onClick={filePicker}
          title='Pick Image'>
          <i className="fas fa-images"></i>
          </Button>}
        </div>
      </div>

      <div className='buttons'>

        {previewURL && prevURL.showPrev ? (<Buttons/>) : imagePrev ? (<Buttons/>) : null}
      </div>


    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {profileImage, deleteImage, getProfile})(ImageUpload);
