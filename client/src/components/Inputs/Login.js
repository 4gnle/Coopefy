import React, { useState, useEffect, useRef } from "react";

// CSS and UI
import {InputBox,
InputsWithin,
Cta,
Cta2,
Titles,
SmallLink,
Label,
Inputs,
InputButton,
Small,
MetamaskLogin,
MetamaskButton,
InsideIcon} from "./Inputs";
import metamask from '../UI/crypto-icons/metamask.png'

// Redux Functions
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../redux/actions/alert";
import { loginUser } from "../../redux/actions/inputs";

const Login = ({history}) => {
  if (localStorage.token) {
    history.push("/dashboard");
  }

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [userOrEmail, setUserOrEmail] = useState("");

  const [validData, setValidData] = useState(false);

  const { username, email, password } = formData;

  const loginDataAdded = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (password.trim().length >= 8) {
        checkValidity();
      }
    }, [50]);
  }, [password]);

  useEffect(() => {
    if (!loginDataAdded.current) {
      setTimeout(() => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const usernameRegex = /^[a-zA-Z0-9][\w-]+$/;

        if (emailRegex.test(userOrEmail)) {
          setFormData({ ...formData, email: userOrEmail });
        } else if (usernameRegex.test(userOrEmail)) {
          setFormData({ ...formData, username: userOrEmail });
        }

        loginDataAdded.current = true;
      }, [50]);
    }
  }, [userOrEmail, formData]);

  const checkValidity = () => {
    setValidData(true);
  };

  const userEmail = (e) => {
    setUserOrEmail(e.target.value);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    loginDataAdded.current = false;
  };

  const onSubmit = (event) => {
    if (!validData) {
      dispatch(setAlert("Invalid inputs", "danger"));
    } else {
      dispatch(loginUser(history, { username, email, password }));
    }
    event.preventDefault();
  };

  return (
    <InputBox>
      <form>
        <InputsWithin>
          <Titles>
            <Cta>Log in</Cta>
            <Cta2>and collaborate!</Cta2>
          </Titles>
          <Label className="lead">Email or Username</Label>
          <Inputs
            type="text"
            placeholder="&#xf0e0; Write your email"
            onChange={(e) => userEmail(e)}
            value={userOrEmail}
          />

          <Label className="lead">Password</Label>
          <Inputs
            type="password"
            name="password"
            placeholder="&#xF084; Write your password"
            onChange={(e) => onChange(e)}
            value={formData.password}
          />

          <InputButton
          type="submit"
          onClick={onSubmit} className="button">
            Log In
          </InputButton>

          <Small>
            Don't have an account? <SmallLink to="/register">Sign up then!</SmallLink>
          </Small>
        </InputsWithin>
      </form>

      <MetamaskLogin>
        <MetamaskButton
          className='button random'
        >
        <InsideIcon style={{width: '1rem', height: '1rem'}} src={metamask}/>{' '}
        Log In with Metamask
        </MetamaskButton>
      </MetamaskLogin>

    </InputBox>
  );
};

export default Login;
