import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {alertActions, timeslotActions, vanActions} from '../_actions';

import MButton from '@material-ui/core/Button';
import MTextField from '@material-ui/core/TextField';
import MTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MContainer from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import MInputLabel from '@material-ui/core/InputLabel';
import MFormControl from '@material-ui/core/FormControl';
import MSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { usePlacesWidget } from "react-google-autocomplete";

import { useFormik } from 'formik';
import * as yup from 'yup';

dayjs.extend(utc);
dayjs.extend(timezone)

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
  formControl: {
    margin: theme.spacing(1,0),
    minWidth: 250,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
    amount: yup
    .string('Enter amount')
    .required('required'),
    startTime: yup
    .string('Enter start time')
    .required('required'),
    endTime: yup
    .string('Enter end time')
    .required('required'),
});

const EditTimeslot = (props) => {
  useEffect(() => {
    console.log(`props ${JSON.stringify(props)}`);
    document.title = 'CP-Timeslot/Edit';
    props.getVans();
  }, []);

  const classes = useStyles();
  const timeslot = props.edited ? props.items[0] : props.location.state ;   
  const formik = useFormik({
    initialValues: {
      address: timeslot.address,
      lat: timeslot.lat,
      lng: timeslot.lng,
      amount: timeslot.amount,
      discount: timeslot.discount,
      surcharge: timeslot.surcharge,
      startTime: dayjs(timeslot.startTime).tz("America/Los_Angeles").format('YYYY-MM-DDTHH:mm:ss'),
      endTime: dayjs(timeslot.endTime).tz("America/Los_Angeles").format('YYYY-MM-DDTHH:mm:ss'),
      sold: timeslot.sold,
      vanId: timeslot.vanId,
      id: timeslot.id,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let {amount, surcharge, discount, sold, id, ...rest}  = values;

      props.clearAlerts();
      await props.editTimeslot({amount, surcharge, discount, sold, id});
    },
  });

  const { ref: googlePlaceRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_PLACES_KEY,
    onPlaceSelected: (place) => {
      console.log(JSON.stringify(place));
      formik.setFieldValue("address", place.formatted_address);
      formik.setFieldValue("lat", place.geometry.location.lat());
      formik.setFieldValue("lng", place.geometry.location.lng());
    },
    inputAutocompleteValue: "formatted_address",
    options: {
      types: ["address"],
      componentRestrictions: { country: "us" },
    },
  });

  const vanOptions = (vans) => {
    let options = []
    options.push(<option key="vanNone" aria-label="None" value="" />);
    if(!!vans){
      vans.map((van, _key) => {
        options.push(<option key={van.id} value={van.id}>{van.name}</option>)
      })
    }
    return options;
  };

  return (
    <MContainer component="main" maxWidth="xs">
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Edit Timeslot
        </MTypography>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <MFormControl className={classes.formControl}>
                <MInputLabel id="status-select-input-label">Charging Van</MInputLabel>
                <MSelect
                labelId="vanId"
                id="vanId"
                name="vanId"
                value={formik.values.vanId}
                onChange={formik.handleChange}
                disabled
                >
                {
                  props.vansLoading && (<option key="vanLoading" aria-label="Loading" label="Loading..." value="" />)
                }
                {
                  !props.vansLoading && vanOptions(props.vans)
                }
                </MSelect>
            </MFormControl>
            <MTextField
              id="startTime"
              label="startTime"
              type="datetime-local"
              margin="normal"
              defaultValue={formik.values.startTime}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              onChange={formik.handleChange}
              error={formik.touched.startTime && Boolean(formik.errors.startTime)}
              helperText={formik.touched.startTime && formik.errors.startTime}
              />
            <MTextField
              id="endTime"
              label="endTime"
              type="datetime-local"
              margin="normal"
              defaultValue={formik.values.endTime}
              InputLabelProps={{
                shrink: true,
              }}
              disabled
              onChange={formik.handleChange}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}  
            />

            <MTextField
              fullWidth
              variant="outlined"
              inputRef={googlePlaceRef}
              id="address"
              name="address"
              placeholder="address"
              disabled
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />

          <MTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="amount"
            label="amount"
            name="amount"
            autoComplete="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}            
          />
          <MTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="discount"
            label="discount"
            type="discount"
            id="discount"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.touched.discount && Boolean(formik.errors.discount)}
            helperText={formik.touched.discount && formik.errors.discount}
          />
          <MTextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="surcharge"
            label="surcharge"
            type="surcharge"
            id="surcharge"
            value={formik.values.surcharge}
            onChange={formik.handleChange}
            error={formik.touched.surcharge && Boolean(formik.errors.surcharge)}
            helperText={formik.touched.surcharge && formik.errors.surcharge}
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
  const {editing, items, edited} = state.timeslots;
  const {loading: vansLoading, items: vans} = state.vans;
  const {alert} = state;
  return {editing, items, edited, alert, vansLoading, vans};
}

const actionCreators = {
  editTimeslot: timeslotActions.edit,
  getVans: vanActions.getAll,
  clearAlerts: alertActions.clear,
};

const connectedEditTimeslot = connect(mapState, actionCreators)(EditTimeslot);
export {connectedEditTimeslot as EditTimeslotPage};
