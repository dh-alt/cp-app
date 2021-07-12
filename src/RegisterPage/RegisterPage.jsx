import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {alertActions, userActions} from '../_actions';

import MButton from '@material-ui/core/Button';
import MTextField from '@material-ui/core/TextField';
import MLink from '@material-ui/core/Link';
import MGrid from '@material-ui/core/Grid';
import MBox from '@material-ui/core/Box';
import MTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MContainer from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';

import { useFormik } from 'formik';
import * as yup from 'yup';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const phoneRegex = /^[0-9]{10}$/;
const nameRegex = /^[a-zA-Z0-9\']+$/;

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
  firstname: yup
  .string('Enter your firstname')
  .matches(nameRegex, "invalid firstname")
  .required('firstname is required'),
  lastname: yup
  .string('Enter your lastname')
  .matches(nameRegex, "invalid lastname")
  .required('lastname is required'),
  phone: yup
  .string('Enter your phone number')
  .matches(phoneRegex, "10 digits only")
  .required('Our driver needs it to contact you'),
});

const SignUp = (props) => {
  useEffect(() => {
    props.logout();
    document.title = 'CP-LoginPage';
  }, []);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      role: 'user'
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let {email, password} = values;
      props.clearAlerts();
      console.log(`Register submission` + JSON.stringify(values));
      await props.register(values);
    },
  });

  return (
    <MContainer component="main" maxWidth="xs">
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Sign Up
        </MTypography>
        <p>TODO: Email Verification</p>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}            
            autoFocus
          />
          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="current-password"
          />
          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="firstname"
            label="firstname"
            type="firstname"
            id="firstname"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.touched.firstname && Boolean(formik.errors.firstname)}
            helperText={formik.touched.firstname && formik.errors.firstname}
            autoComplete="name"
          />
          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastname"
            label="lastname"
            type="lastname"
            id="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.touched.lastname && Boolean(formik.errors.lastname)}
            helperText={formik.touched.lastname && formik.errors.lastname}
            autoComplete="lastname"
          />
          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phone"
            label="phone"
            type="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            inputProps={{ maxLength: 10 }}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <MButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting || !formik.dirty}
          >
            Sign Up
          </MButton>
        </form>
      </div>
    </MContainer>
  );
}


function mapState(state) {
  const {registering} = state.registration;
  const {alert} = state;
  return {registering, alert};
}

const actionCreators = {
  register: userActions.register,
  logout: userActions.logout,
  clearAlerts: alertActions.clear,
};

const connectedRegisterPage = connect(mapState, actionCreators)(SignUp);
export {connectedRegisterPage as RegisterPage};
