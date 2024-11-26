import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { clearSignup, logIn } from '../../store/actions/UserAuthActions';
import { Typography } from '@mui/material';

import './Login.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let user = useSelector(state => state.user);
  let signupStatus = useSelector(state => state.user.signupStatus);
  let authStatus = useSelector(state => state.user.authStatus);
  const initialValues = { userName: "", password: "" };
  const [loginFormValue, setLoginFormValue] = useState(initialValues);
  const [formError, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted && Object.keys(formError).length == 0) {
      dispatch(logIn(loginFormValue));
    }

  }, [formError])



  useEffect(() => {
    let auth = (user.authStatus);
    if (auth) {
      sessionStorage.setItem("JWT_TOKEN", "Bearer " + user.token);
      navigate("/")
    }
  }, [user])

  useEffect(() => {
   if (signupStatus) {
      dispatch(clearSignup());
    }
  }, [])



  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setLoginFormValue({ ...loginFormValue, [name]: value });
  }


  const validateFrom = (values) => {
    const { userName, password } = values;
    let errors = {};
    if (!userName) {
      errors.userName = "The Username is required!";
    }
    if (!password) {
      errors.password = "Password is required!";
    }

    setFormErrors(errors)
  }


  const handelLoginSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    validateFrom(loginFormValue);
  }

  return (
    <div className='login-class'>


      <form className='login-form' onSubmit={handelLoginSubmit}>


        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid className='form-grid' item xs={4}>
              <span className='login-label'> <AccountCircleIcon sx={{ fontSize: 45 }} /> Log In</span>

              {(authStatus === false) &&
                <Typography className="text-red-500" component="h3" variant="h6">
                  Username or Password is incorrect.
                </Typography>
              }

              <TextField className="login-field" label="Username"
                name='userName' type='text' variant="filled" fullWidth
                value={loginFormValue.userName}
                error={!!formError.userName}
                onChange={handelFormInput}
              />
              {!!formError.userName && <Alert severity='error'> {formError.userName}</Alert>}

              <TextField className="login-field" label="Password"
                type='password' name='password' variant="filled" fullWidth
                value={loginFormValue.password}
                error={!!formError.password}
                onChange={handelFormInput}
              />
              {!!formError.password && <Alert severity='error'> {formError.password}</Alert>}

              <Button className="login-button" type="submit" variant='contained'>Submit</Button>
            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Box>

      </form>
    </div>
  )
}

export default Login;