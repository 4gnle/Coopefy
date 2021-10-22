import React from "react";
import styled from "styled-components";
import Button from '../../UI/Button';
import { Link } from "react-router-dom";

//Styled-components
export const ProfileBox = styled.div`
  box-sizing: border-box;
  border: 0px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25),
    12px 12px 12px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5vh;
  padding: 5px;

  @media (max-width: 900px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    box-shadow: 0px 0px 0px 0px;
    margin-top: 0;
  }
`;

export const TopButtons = styled.div`
@media (max-width: 650px) {
  position: absolute;
  top: 10%;
}
`

export const ProfileMain = styled.div`
  width: 100%;
  display: inline-block;
  position: static;
  box-sizing: border-box;
  margin-left: 0.5vw;
  margin-top: 30px;

  @media (max-width: 900px) {
    box-sizing: border-box;
    margin-left: 0.5vw;
    margin-top: 20px;
  }

  @media (max-width: 650px) {
    box-sizing: border-box;
    margin-left: 0.5vw;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    height: 45vh;
    margin-top: 100px;
  }
`;
export const ProfileTop = styled.div`
  position: absolute;
  display: inline-block;
  margin-left: 362px;
  top: 13rem;
  font-size: 1.2rem;

  @media (max-width: 900px) {
    margin-left: 242px;
    top: 190px;
  }
  @media (max-width: 650px) {
    margin-left: 37vw;
    top: 10rem;
  }
  @media (max-width: 480px) {
    margin-left: 160px;
  }
`;

export const ProfileName = styled.strong`
  @media (max-width: 650px) {
    left: 19vw;
    margin-top: 1vh;
  }
`;
export const ProfileUsername = styled.span`
  position: absolute;
  top: 18px;

  @media (max-width: 900px) {
    top: 18px;
  }

  @media (max-width: 650px) {
    top: 18px;
  }

  @media (max-width: 480px) {
    top: 18px;
    bottom: 10px;
  }
`;
export const ProfileMainData = styled.div`
  display: block;
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border: 2px solid black;
  margin-left: 6rem;
  border-radius: 180px;
  background-color: black;

  @media (max-width: 900px) {
    width: 8rem;
    height: 8rem;
    margin-left: 3rem;
  }

  @media (max-width: 650px) {
    margin-top: 4rem;
  }
  @media (max-width: 480px) {
    margin-left: -15px;
    margin-right: auto;
  }
`;
export const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 360px;
  object-fit: cover;
`;

export const ProfileLinks = styled.div`
  width: 10rem;
  margin-left: 6rem;
  margin-top: 2rem;
  height: auto;
  border-radius: 18px;
  text-align: center;

  @media (max-width: 900px) {
    width: 9rem;
    margin-left: 3rem;
  }

  @media (max-width: 650px) {
    width: 30%;
    margin-left: 1.7rem;
  }

  @media (max-width: 480px) {
    position: absolute;
    margin-top: 2.2rem;
    top: 230px;
    margin-left: 5rem;
    margin-right: auto;
    width: 70%;
  }
`;
export const ProfileWebsite = styled.a`
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  color: #323424;

  &:hover {
    color: #6e6e6e;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    float: none;
    margin-left: auto;
    margin-right: auto;
  }
`;
export const ProfileIconSection = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-left: 0px;
`;
export const Icon = styled.i`
  font-size: 1.8rem;
  margin-left: 10px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const ProfileLocation = styled.div`
  text-align: center;
`;
export const ProfileSkills = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 3fr);
  grid-auto-rows: 2em;
  grid-gap: 2vh;
  margin-left: 367px;
  margin-top: -50px;
  float: left;
  width: 60%;

  @media (max-width: 900px) {
    position: relative;
    margin-left: 15rem;
  }

  @media (max-width: 480px) {
    position: absolute;
    width: 95%;
    top: 450px;
    margin-left: auto;
    margin-right: auto;
    float: none;
    grid-gap: 2.5vh;
  }
`;

export const SkillButton = styled(Button)`
  font-size: 0.7rem;
  margin: 1px;
  border: 0;
  border-radius: 8px;
`;

export const Skills = styled.div`
  &:hover {
    opacity: 0.5;
  }
`;
