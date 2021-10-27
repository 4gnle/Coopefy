import React, {useRef, useState, useEffect} from 'react'
// import PropTypes from 'prop-types';

//Redux
import {deleteImage, getProfile, profileImage} from '../../redux/actions/profile';
import {useSelector, useDispatch} from 'react-redux';

// UI & CSS
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';
import styled from 'styled-components';

const ImageUpload = ({profileimage}) => {
  const dispatch = useDispatch();

  const [file, setFile] = useState();
  const [previewURL, setpreviewURL] = useState();
  const [imagePrev, setImagePrev] = useState();
  const [prevURL, setprevURL] = useState({showPrev: false});
  const [valid, setValid] = useState();
  const [spinner, setSpinner] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (profileimage){
      const imageBuffer = new Buffer(profileimage, 'base64');
      setImagePrev(imageBuffer);
    };
  }, [profileimage]);


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
    await dispatch(profileImage(formData))
    setSpinner(false);
  }

  const deleteFunc = async (e) => {
    e.preventDefault();
    await setprevURL({showPrev: false});
    await setImagePrev(null)
    await setFile(null);
    dispatch(deleteImage());
  }

  const showConsole = () => {console.log(imagePrev)}
  const Buttons = () => {
    return (
    <>
      <Button
        className="button primary m"
        onClick={submitImage}
        title='Upload Image'>
        <i className="fas fa-upload"></i>
        </Button>

        <Button
        onClick={showConsole}
        className='button bad m'
        title='Delete Image'>
        <i className="fas fa-trash-alt">
        </i>
      </Button>
    </>)}

  return (

    <ImageUploadBox>
      {spinner && (<Spinner/>)}
      <input
        type="file"
        ref={filePickerRef}
        accept='.jpeg,.jpg,.png'
        style={{display: "none"}}
        onChange={imagePreview}
      />

      <ImgUpload>
        {imagePrev ? (<ImgUploadPrev src={imagePrev} alt="Preview"/>) : previewURL && prevURL.showPrev ? (<ImgUploadPrev src={previewURL} alt="Preview"/>) :
          <ButtonImage
          onClick={filePicker}
          title='Pick Image'>
          <i className="fas fa-images"></i>
          </ButtonImage>}
      </ImgUpload>

      <ButtonSection>

        {previewURL && prevURL.showPrev ? (<Buttons/>) : imagePrev ? (<Buttons/>) : null}

      </ButtonSection>
    </ImageUploadBox>
  )
}

export default ImageUpload;

const ImageUploadBox = styled.div`
  width: 10%;
  text-align: center;
  margin: auto;
`;

const ImgUpload = styled.div`
  border: 2px solid black;
  display: flex;
  margin: auto;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 180px;
  background: #000000;
`;

const ImgUploadPrev = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 180px;
  object-fit: cover;
`;

const ButtonSection = styled.div`
  position: absolute;
  margin-left: 5px;

  @media (max-width: 650px) {
    margin-left: 20px;
  }
  `;

const ButtonImage = styled(Button)`
  border: black;
  width: 7.5rem;
  height: 7.5rem;
  border-radius: 180px;
  background: #000000;
  color: white;
  cursor: pointer;
  text-align: center;

  &:hover {
    background: white;
    color: black;
    transition: all 0.5s ease;
    float: center;
    text-align: center;
  }
`;
