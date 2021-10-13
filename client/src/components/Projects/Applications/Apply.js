import React, {useState, useEffect} from 'react'

// UI & CSS
import styled from 'styled-components'
import Button from '../../UI/Button'

const Apply = () => {

  const ApplyBox = styled.div`
    position: absolute;
    box-sizing: border-box;
    border: 0px solid #000000;
    box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25), 12px 12px 12px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    width: 80%;
    height: fit-content;
    padding: 5%;
    top: 10%;
    right: 0;
    left: 0;
    bottom: 50%;
    margin: auto;
  `

  const Form = styled.form`
    width: 100%;
  `

  const Input = styled.input`
    display: block;
    text-align: left;
    position: relative;
    font: inherit;
    margin-top: -0.5px;
    margin-bottom: 10px;
    padding: 0.5rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    width: 300px;
  `

  const [formData, setFormData] = useState();

  const onChange = (e) => {
  setFormData(e.target.value);
  }

  const sendApplication = () => {
    console.log(formData)
  }

  return (
    <ApplyBox>
      <Form>
        <Input>

        </Input>
        <Button
          onClick={sendApplication}
        >

        </Button>
      </Form>
    </ApplyBox>
  )
}

export default Apply
