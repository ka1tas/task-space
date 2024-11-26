import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import moment from 'moment';
import { Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearSignup, signUp } from '../../store/actions/UserAuthActions';

import './Signup.scss';

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = { userName: "", firstName: "", lastName: "", email: "", dateOfBirth: "", gender: "", password: "", confirmpassword: "" };
  const [signupFormValue, setSignupFormValue] = useState(initialValues);
  const [formError, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  let user = useSelector(state => state.user);
  let signupStatus = useSelector(state => state.user.signupStatus);
  let errorMessage = useSelector(state => state.user?.errorMessage);

  useEffect(() => {
    let auth = user.authStatus;
    if (auth) {
      navigate("/")
    } else if (signupStatus) {
      dispatch(clearSignup());
      navigate("/login")
    }
  }, [])


  useEffect(() => {
    if (signupStatus) {

      setTimeout(() => {
        navigate("/login")
      }, 5000);
    }
  }, [signupStatus])

  const genders = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (isFormSubmitted && Object.keys(formError).length == 0) {
      console.log("No Error from submitted")
      dispatch(signUp(signupFormValue));
    }

  }, [formError])

  const handelFormInput = (e) => {
    const { name, value } = e.target;
    setSignupFormValue({ ...signupFormValue, [name]: value });
  }

  const handelSignUpSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    validateFrom(signupFormValue);
  }

  const validateFrom = (values) => {
    const { userName, firstName, lastName, email, dateOfBirth, gender, password, confirmpassword } = values;
    let errors = {};
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!userName) {
      errors.userName = "The Username is required!";
    }

    if (!firstName) {
      errors.firstName = "The firstName is required!";
    }

    if (!lastName) {
      errors.lastName = "The lastName is required!";
    }
    if (!email) {
      errors.email = "The email is required!";
    } else if (!emailRegex.test(email)) {
      errors.email = "The email is not valid!";
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = "The dateOfBirth is required!";
    } else if (!moment(dateOfBirth).isBefore(new Date())) {
      errors.dateOfBirth = "The DOB can't be future!";
    }
    if (!gender) {
      errors.gender = "The gender is required!";
    }
    if (!password) {
      errors.password = "Password is required!";
    } else if (password.length < 5) {
      errors.password = "Password should be more than 4 letters!";
    }
    if (!confirmpassword) {
      errors.confirmpassword = "Confirm password is required!";
    }
    if (password !== confirmpassword) {
      errors.password = "Password and confirm password didnot match";
      errors.confirmpassword = "Password and confirm password didnot match";
    }
    setFormErrors(errors)
  }


  return (
    <div className='signup-class'>


      <form className='signup-form' onSubmit={handelSignUpSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
            </Grid>
            <Grid className='form-grid' item xs={4}>
              <span className='signup-label'> <PersonAddAltIcon sx={{ fontSize: 45 }} /> Sign Up</span>

              {(errorMessage) &&
                <Typography className="text-red-500" component="h3" variant="h7">
                  {errorMessage}
                </Typography>
              }


              {(signupStatus) &&
                <Typography className="text-green-500" component="h3" variant="h7">
                  Registration successful, You will be redirected to the login page in 5 sec.
                </Typography>
              }


              <TextField className="signup-field" label="Create Username"
                name="userName" variant="filled" fullWidth
                error={!!formError.userName}
                value={signupFormValue.userName}
                onChange={handelFormInput}
              />

              {!!formError.userName && <Alert severity='error'> {formError.userName}</Alert>}

              <Grid className='form-grid-2' item xs={12}>
                <TextField className="signup-field signup-field-2" label="Firt Name"
                  name="firstName" variant="filled" fullWidth
                  value={signupFormValue.firstName}
                  error={!!formError.firstName}
                  onChange={handelFormInput}
                />

                <TextField className="signup-field " label="Last name"
                  variant="filled" name="lastName" fullWidth
                  value={signupFormValue.lastName}
                  error={!!formError.lastName}
                  onChange={handelFormInput}
                />
              </Grid>


              <Grid className='form-grid-2' item xs={12}>
                {!!formError.firstName && <Alert severity='error'> {formError.firstName}</Alert>}
                {!!formError.lastName && <Alert severity='error'> {formError.lastName}</Alert>}
              </Grid>

              <TextField className="signup-field" label="Enter Email"
                type='text' name="email" variant="filled" fullWidth
                value={signupFormValue.email}
                error={!!formError.email}
                onChange={handelFormInput}
              />
              {!!formError.email && <Alert severity='error'> {formError.email}</Alert>}

              <Grid className='form-grid-2' item xs={12}>

                <TextField className="signup-field signup-field-2" label="Date of Birth"
                  name="dateOfBirth" variant="filled" type='date' fullWidth
                  value={signupFormValue.dateOfBirth}
                  error={!!formError.dateOfBirth}
                  onChange={handelFormInput}
                />

                <TextField
                  className='gender-select'
                  id="outlined-select-gender"
                  select
                  label="Select Gender"
                  variant="filled"
                  name="gender"
                  value={signupFormValue.gender}
                  error={!!formError.gender}
                  onChange={handelFormInput}
                  fullWidth
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              </Grid>


              <Grid className='form-grid-2' item xs={12}>
                {!!formError.dateOfBirth && <Alert severity='error'> {formError.dateOfBirth}</Alert>}
                {!!formError.gender && <Alert severity='error'> {formError.gender}</Alert>}
              </Grid>


              <TextField className="signup-field" label="Crate Password"
                type='password' name="password" variant="filled" fullWidth
                error={!!formError.password}
                value={signupFormValue.password}
                onChange={handelFormInput}
              />
              {!!formError.password && <Alert severity='error'> {formError.password}</Alert>}
              <TextField className="signup-field" label="Confirm Password"
                type='password' name="confirmpassword" variant="filled" fullWidth
                value={signupFormValue.confirmpassword}
                error={!!formError.confirmpassword}
                onChange={handelFormInput}
              />
              {!!formError.confirmpassword && <Alert severity='error'> {formError.confirmpassword}</Alert>}

              <Button className="signup-button" type="submit" variant='contained'>Submit</Button>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" className="text-blue-500" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={4}>
            </Grid>
          </Grid>
        </Box>
      </form>

    </div>
  )
}

export default Signup;