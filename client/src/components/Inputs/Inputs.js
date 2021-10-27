import React from "react";
import styled from "styled-components";
import Button from '../UI/Button';
import { Link } from "react-router-dom";

export const InputBox = styled.div`
  display: block;
  text-align: center;
  width: 500px;
  max-width: 70%;
  margin: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 2rem;
  box-shadow: 0 2px 12px grey;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 650px) {
    height: fit-content;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const MetamaskLogin = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 650px) {
    text-align: center;
  }
`;

export const InputsWithin = styled.div`
  display: inline-block;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 650px) {
    text-align: center;
  }

  &::-webkit-input-placeholder {
    text-align: left;
    font-family: 'FontAwesome';
  }

  &:-moz-placeholder {
    text-align: left;
  }
`;

export const Cta = styled.h1`
  margin-bottom: 2.5px;
  margin-top: 5px;
`;

export const Cta2 = styled.p`
  margin-bottom: 2.5px;
  margin-top: 5px;
`;

export const Titles = styled.div`
  margin-bottom: 15px;
`;

export const SmallLink = styled(Link)`
  &:hover {color: red;}
`;

export const Label = styled.label`
  display: block;
  text-align: left;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const Inputs = styled.input`
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

&:focus {
  outline: none;
  border-color: blue;
  background: lightgray;
}
`;

export const InputButton = styled.button`
  display: block;
  margin-left: 100px;
  text-align: center;

  @media (max-width: 650px) {
    margin-top: 5px;
    height: 50px;
  }
`;

export const MetamaskButton = styled(Button)`
`;

export const InsideIcon = styled.img`
  position: relative;
`;

export const Small = styled.small`
  @media (max-width: 650px) {
    display: block;
    position: relative;
    top: 1rem;
  }
`;
