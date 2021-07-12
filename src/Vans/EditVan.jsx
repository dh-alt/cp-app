import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {alertActions, vanActions} from '../_actions';

import MButton from '@material-ui/core/Button';
import MTextField from '@material-ui/core/TextField';
import MLink from '@material-ui/core/Link';
import MGrid from '@material-ui/core/Grid';
import MBox from '@material-ui/core/Box';
import MTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MContainer from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import MInputLabel from '@material-ui/core/InputLabel';
import MFormControl from '@material-ui/core/FormControl';
import MSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useFormik } from 'formik';
import * as yup from 'yup';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  name: yup
  .string('Enter name')
  .required('required'),
  license: yup
  .string('Enter license')
  .required('required'),
  make: yup
  .string('Enter make')
  .required('required'),
  model: yup
  .string('Enter model')
  .required('required'),
  year: yup
  .string('Enter year')
  .required('required'),
  status: yup
  .string('select status')
  .required('status is required'),
});

const EditVan = (props) => {
  useEffect(() => {
    console.log(`props ${JSON.stringify(props)}`);
    document.title = 'CP-Van/Add';
  }, []);

  const classes = useStyles();
  const van = props.edited ? props.items[0] : props.location.state ;   
  const formik = useFormik({
    initialValues: {
      name: van.name,
      license: van.license,
      make: van.make,
      model: van.model,
      year: van.year,
      status: van.status,
      id: van.id
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      props.clearAlerts();
      await props.editVan(values);
    },
  });

  return (
    <MContainer component="main" maxWidth="xs">
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Edit Van
        </MTypography>
        <p>TODO for edit: fetch data again otherwise hitting back button shows old data</p>
        <p>TODO: delete van</p>
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
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}            
                  autoFocus
                />
                <MTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="license"
                  label="license"
                  type="license"
                  id="license"
                  value={formik.values.license}
                  onChange={formik.handleChange}
                  error={formik.touched.license && Boolean(formik.errors.license)}
                  helperText={formik.touched.license && formik.errors.license}
                  autoComplete="license"
                />
                <MTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="make"
                  label="make"
                  type="make"
                  id="make"
                  value={formik.values.make}
                  onChange={formik.handleChange}
                  error={formik.touched.make && Boolean(formik.errors.make)}
                  helperText={formik.touched.make && formik.errors.make}
                  autoComplete="make"
                />
                <MTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="model"
                  label="model"
                  type="model"
                  id="model"
                  value={formik.values.model}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 20 }}
                  error={formik.touched.model && Boolean(formik.errors.model)}
                  helperText={formik.touched.model && formik.errors.model}
                />
                <MTextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="year"
                  label="year"
                  type="year"
                  id="year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  inputProps={{ maxLength: 4 }}
                  error={formik.touched.year && Boolean(formik.errors.year)}
                  helperText={formik.touched.year && formik.errors.year}
                />
                  <MFormControl className={classes.formControl}>
                      <MInputLabel id="status-select-input-label">Status</MInputLabel>
                      <MSelect
                      labelId="status"
                      id="status"
                      name="status"
                      value={formik.values.status}
                      onChange={formik.handleChange}
                      >
                      <MenuItem value={'available'}>Available</MenuItem>
                      <MenuItem value={'maintenance'}>Maintenance</MenuItem>
                      <MenuItem value={'sold'}>Sold</MenuItem>
                      </MSelect>
                  </MFormControl>
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
  const {editing, items, edited} = state.vans;
  const {alert} = state;
  return {editing, items, edited, alert};
}

const actionCreators = {
  editVan: vanActions.edit,
  clearAlerts: alertActions.clear,
};

const connectedEditVan = connect(mapState, actionCreators)(EditVan);
export {connectedEditVan as EditVanPage};
