import React, { useState, useEffect } from "react";

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

//Redux & router
import { getProfile } from "../../../redux/actions/profile";
import { postApplication } from "../../../redux/actions/project";

import { connect } from "react-redux";

const ApplyBox = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: white;
  border: 0px solid #000000;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25),
    12px 12px 12px rgba(0, 0, 0, 0.25);
  border-radius: 18px;
  width: 80%;
  height: fit-content;
  padding: 5%;
  top: 10%;
  right: 0;
  left: 0;
  bottom: 50%;
  margin: auto;
  z-index: 1000;
`;
const ProjectData = styled.div`
  width: 100%;
`;
const Description = styled.h2`
  text-align: center;
  font-size: 1.5rem;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
`;
const Form = styled.form`
  width: 100%;
`;
const Textarea = styled.textarea`
  display: block;
  text-align: left;
  position: relative;
  font: inherit;
  margin-top: -0.5px;
  margin-bottom: 10px;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  height: 250px;
`;
const ButtonSection = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

const Apply = ({
  profile: { signedprofile },
  getProfile,
  closeApplication,
  sendApplication,
  postApplication,
  projectdescription,
  projectname,
  projectreward,
  projectamount,
  projectlocation,
  projectid,
  history,
}) => {
  const [formData, setFormData] = useState({
    applicantname: "",
    applicantusername: "",
    application: "",
  });

  const [projectID, setProjectID] = useState();
  const [spinner, setSpinner] = useState(false);

  const { application, applicantname, applicantusername } = formData;

  useEffect(() => {
    getProfile();

    if (signedprofile) {
      setFormData({
        ...formData,
        applicantusername: signedprofile.username,
        applicantname: signedprofile.profilename,
      });
    }
  }, [getProfile]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    console.log(formData);
  };

  const performApplication = async (e) => {
    e.preventDefault();
    setSpinner(true);
    await postApplication(formData, projectid);
    sendApplication();
    setSpinner(false);
  };

  return (
    <ApplyBox>
      <ProjectData>
        <Description>Project Data to Remember</Description>

        <p>
          <b>Description:</b> {projectdescription}
        </p>

        {projectreward && projectamount && (
          <p>
            <b>Reward:</b> {projectamount} {projectreward}
          </p>
        )}

        {projectlocation && (
          <p>
            <b>Location:</b> {projectlocation}
          </p>
        )}
      </ProjectData>

      <Form>
        <Title>Write your Application</Title>
        <Textarea
          onChange={(e) => onChange(e)}
          value={application}
          name="application"
          placeholder="Write your application here"
        />

        <ButtonSection>
          <Button className="button bad" onClick={closeApplication}>
            Cancel
          </Button>
          <Button
            className="button primary"
            onClick={(e) => performApplication(e)}
          >
            Send Application
          </Button>
        </ButtonSection>
      </Form>
    </ApplyBox>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfile, postApplication })(Apply);
