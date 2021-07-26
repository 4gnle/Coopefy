import React, {Fragment, useRef, useState, useEffect} from 'react'
// import PropTypes from 'prop-types';

//Redux
import {deleteImage, getProfileImage, profileImage} from '../../redux/actions/profile';
import {connect} from 'react-redux';

import Button from '../UI/Button'

import './ProfileImage.css'

const ImageUpload = ({profileImage, getProfileImage, deleteImage}) => {

  const [file, setFile] = useState();
  const [previewURL, setpreviewURL] = useState();
  const [prevURL, setprevURL] = useState({showPrev: true});
  const [valid, setValid] = useState();

  const filePickerRef = useRef();

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
      fileIsValid = false;
    }
  }

  const filePicker = () => {
    filePickerRef.current.click();
  }

  const submitImage = (e) => {
    const formData = new FormData();
    formData.append("profileimage", file);
    e.preventDefault()
    profileImage(formData)
  }

  const deleteFunc = (e) => {
    e.preventDefault();
    setprevURL({showPrev: false});
    setFile(null);
    deleteImage();
  }

  return (

    <div>

      <input
        type="file"
        ref={filePickerRef}
        accept='.jpeg,.jpg,.png'
        style={{display: "none"}}
        onChange={imagePreview}
      />

      <div className='image-upload.center'>
        <div  className='image-upload__preview'>

          {previewURL && prevURL.showPrev ? (<img src={previewURL} alt="Preview"/>) :
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


        {previewURL && prevURL.showPrev ?
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
          </Fragment>
          : null
        }
      </div>


    </div>
  )
}

export default connect(null, {profileImage, deleteImage, getProfileImage})(ImageUpload);
