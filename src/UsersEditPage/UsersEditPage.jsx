import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {alertActions, userActions} from '../_actions';

import MButton from '@material-ui/core/Button';
import MCssBaseline from '@material-ui/core/CssBaseline';
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

const EditUser = (props) => {
  useEffect(() => {
    console.log(`props ${JSON.stringify(props)}`);
    document.title = 'CP-User/Edit';
  }, []);

  const classes = useStyles();
  const user = props.edited ? props.items[0] : props.location.state ;   
  const formik = useFormik({
    initialValues: {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      id: user.id
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      props.clearAlerts();
      await props.editUser(values);
    },
  });

  return (
    <MContainer component="main" maxWidth="xs">
      <MCssBaseline />
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Edit User
        </MTypography>
        <p>TODO: fetch data again otherwise hitting back button shows old data</p>
        <p>TODO: allow role change</p>
        <p>TODO: delete user</p>
        <p>TODO: cancel - go back on cancel</p>
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
            Submit
          </MButton>
        </form>
      </div>
    </MContainer>
  );
}


function mapState(state) {
  const {editing, items, edited} = state.users;
  const {alert} = state;
  return {editing, items, edited, alert};
}

const actionCreators = {
  editUser: userActions.editUser,
  logout: userActions.logout,
  clearAlerts: alertActions.clear,
};

const connectedEditUser = connect(mapState, actionCreators)(EditUser);
export {connectedEditUser as UsersEditPage};
