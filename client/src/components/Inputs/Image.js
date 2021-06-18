import React, {useRef, useState, useEffect} from 'react'
// import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {deleteImage, getProfileImage, profileImage} from '../../actions/profile';

import Button from '../UI/Button'

import './Inputs.css'

const ImageUpload = () => {

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
  }

  const noPicture = (e) => {
    e.preventDefault();
    setprevURL({showPrev: false});
  }

  return (

    <div>

      <input className='form-group'
        type="file"
        ref={filePickerRef}
        accept='.jpeg,.jpg,.png'
        style={{display: "none"}}
        onChange={imagePreview}
      />

      <div className='image-upload.center'>
        <div  className='image-upload__preview'>

          {previewURL && prevURL.showPrev ? (<img src={previewURL} alt="Preview"/>) :
          <p>Please, pick an image</p>}

        </div>
      </div>

      <Button
      type="button"
      onClick={filePicker}
      title='Pick Image'>
      <i className="fas fa-images"></i>
      </Button>

      <Button
      onClick={submitImage}
      className='primary'
      title='Upload Image'>
      <i className="fas fa-upload"></i>
      </Button>

      {previewURL && prevURL.showPrev ?

      <Button
      onClick={noPicture}
      className='bad'
      title='Delete Image'>
      <i className="fas fa-trash-alt">
      </i>
      </Button> : null

      }

    </div>
  )
}

export default ImageUpload;
