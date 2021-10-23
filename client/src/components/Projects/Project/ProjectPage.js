import React, { useState, useEffect } from "react";

//UI & CSS
import styled from "styled-components";
import Spinner from "../../UI/Spinner";
import Button from "../../UI/Button";
import Error404 from "../../UI/Error404";
import eth from "../../UI/crypto-icons/eth.svg";
import btc from "../../UI/crypto-icons/btc.svg";
import sol from "../../UI/crypto-icons/sol.svg";
import bnb from "../../UI/crypto-icons/bnb.svg";
import usdt from "../../UI/crypto-icons/usdt.svg";
import usdc from "../../UI/crypto-icons/usdc.svg";

//Redux & Router
import {
  getProjectById,
  getApplicationsbyID
} from "../../../redux/actions/project";
import { getProfile } from "../../../redux/actions/profile";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Components
import Apply from "../Applications/Apply";
import ApplicationList from "../Applications/ApplicationList";

const Project = ({match, history}) => {
  const [loadProject, setLoadProject] = useState(false);
  const [loadedProjects, setLoadedProjects] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState();

  const [applicationBox, setApplicationBox] = useState(false);

  const dispatch = useDispatch();

  const projectData = useSelector(state => state.project);
  const profileData = useSelector(state => state.profile);
  const authData = useSelector(state => state.authenticate);

  const {project, applications
  } = projectData;
  const {signedprofile, user} = profileData;
  const { isAuth, userData} = authData;

  const getAllData = async () => {
    await dispatch(getProfile());
    setProfileLoaded(true);
    await dispatch(getProjectById(match.params.id));
    setLoadProject(true);
    await dispatch(getApplicationsbyID(match.params.id));
    setLoadedProjects(true);
  };

  useEffect(() => {
    getAllData();
  }, [getProjectById, getProfile, getApplicationsbyID]);

  const projecticon = () => {
    if (project.projectreward === "ETH") {
      return eth;
    }

    if (project.projectreward === "BTC") {
      return btc;
    }

    if (project.projectreward === "SOL") {
      return sol;
    }

    if (project.projectreward === "USDC") {
      return usdc;
    }

    if (project.projectreward === "USDT") {
      return usdt;
    }

    if (project.projectreward === "BNB") {
      return bnb;
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const toApplication = () => {
    setApplicationBox(true);
  };

  const closeApplication = () => {
    setApplicationBox(false);
  };

  const sendApplication = async (data) => {
    await closeApplication();
    history.go(0);
  };

  return (
    <div>
      {applicationBox && project && (
        <Apply
          sendApplication={sendApplication}
          closeApplication={closeApplication}
          projectdescription={project.projectdescription}
          projectreward={project.projectreward}
          projectamount={project.projectamount}
          projectlocation={project.projectlocation}
          projectid={match.params.id}
          projectname={match.params.projectname}
        />
      )}
      {!loadProject ? (
        <Spinner />
      ) : (
        <>
          {project ? (
            <ProjectBox>
              <Button className="button bad" onClick={goBack}>
                Go Back
              </Button>
              <Title>
                <h2>{project.projectname}</h2>
              </Title>
              <BreakLine />

              <Details>
                {project.projectreward && project.projectamount ? (
                  <p>
                    <Icon alt="coin icon" src={projecticon()} width="21px" />{" "}
                    {project.projectamount} {project.projectreward}
                  </p>
                ) : null}
                {project.projectlocation ? (
                  <DetailsLine>
                    <i class="fas fa-map-marker-alt"></i>{" "}
                    {project.projectlocation}
                  </DetailsLine>
                ) : (
                  <DetailsLine>
                    <i className="fas fa-globe location-icon"></i> Remote
                  </DetailsLine>
                )}
                {project.projectduration && (
                  <DetailsLine>
                    <i class="far fa-clock"></i> {project.projectduration}
                  </DetailsLine>
                )}
              </Details>
              <BreakLine />
              <Description>
                {project.projectdescription && project.projectdescription}
              </Description>
              <BreakLine />
              <Skills>
                {project.projectskills.map((skill, index) => (
                  <div key={index}>
                    <Button className="show"> {skill}</Button>
                  </div>
                ))}
              </Skills>

              <BottomSection>
                {signedprofile &&
                isAuth &&
                signedprofile.user._id !== userData._id ? (
                  <Button className="button primary" onClick={toApplication}>
                    Apply
                  </Button>
                ) : (
                  <>
                    {!signedprofile && (
                      <Link to="/register">
                        <Button className="button primary">
                          Log In to Apply
                        </Button>
                      </Link>
                    )}
                  </>
                )}
              </BottomSection>
            </ProjectBox>
          ) : (
            <Error404 />
          )}
        </>
      )}
      {loadedProjects && project && (
        <ApplicationList applications={applications} project={project} />
      )}
    </div>
  );
};

export default Project;

const ProjectBox = styled.div`
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

  @media (max-width: 650px) {
    position: absolute;
    box-shadow: 0 0 0 0;
    width: 96%;
    top: 10%;
    left: 0;
    right: 0;
    margin: 0;
  }
`;

const BreakLine = styled.hr`
  opacity: 0.25;
  width: 100%;

  @media (max-width: 650px) {
    width: 105%;
    margin-left: -0.5%;
  }
`;
const Title = styled.div`
  margin-left: 5%;
`;
const Details = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: fit-content;
  grid-gap: 1rem;
  width: 100%;
  margin-left: 5%;
  margin-top: -5px;
`;
const DetailsLine = styled.span`
  position: relative;
  top: 21px;
`;
const Icon = styled.img`
  position: relative;
  top: 5px;
`;
const Description = styled.div`
  break-line: anywhere;
  margin-left: 5%;
`;
const Skills = styled.div`
  margin-left: 5%;
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-auto-rows: 3rem;
  grid-gap: 0.2rem;
  width: 90%;
  padding: 2%;

  @media (max-width: 650px) {
    margin-left: 5%;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    grid-auto-rows: 2rem;
    grid-gap: 1rem;
    width: 90%;
    padding: 2%;
  }
`;

const BottomSection = styled.div`
  margin-left: auto;
  margin-right: auto;
  text-align:center;
`
