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
    marginBottom: theme.spacing(8),
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

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SignIn = (props) => {
  useEffect(() => {
    props.logout();
    document.title = 'CP-LoginPage';
  }, []);

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let {email, password} = values;
      props.clearAlerts();
      console.log(`LoginPage submission` + JSON.stringify(values));
      await props.login(email, password);
    },
  });

  return (
    <MContainer component="main" maxWidth="xs">
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Sign in
        </MTypography>
        <p>TODO: forgot password</p>
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
          <MButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting || !formik.dirty}
          >
            Sign In
          </MButton>
          <MGrid container>
            <MGrid item xs>
              <MLink component={RouterLink} to='/path/to/section' variant="body2">
                Forgot password?
              </MLink>
            </MGrid>
            <MGrid item>
              <MLink component={RouterLink} to='/register' variant="body2">
                {"Don't have an account? Sign Up"}
              </MLink>
            </MGrid>
          </MGrid>
        </form>
      </div>
    </MContainer>
  );
}

function mapState(state) {
  const {loggingIn} = state.authentication;
  const {alert} = state;
  return {loggingIn, alert};
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
  clearAlerts: alertActions.clear,
};

const connectedLoginPage = connect(mapState, actionCreators)(SignIn);
export {connectedLoginPage as LoginPage};
