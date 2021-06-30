import React, {useState, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {connect} from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import {alertActions, timeslotActions} from '../_actions';
import {TimeslotRadioGroup} from './';

import MButton from '@material-ui/core/Button';
import MCssBaseline from '@material-ui/core/CssBaseline';
import MTextField from '@material-ui/core/TextField';
import MTypography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MContainer from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import { usePlacesWidget } from "react-google-autocomplete";
import { DatePicker as MDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import DateFnsUtils from '@date-io/date-fns';
import dateFnsFormat from 'date-fns/format';

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
    margin: theme.spacing(3,0,2),
    minWidth: 250,
    width: '100%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchema = yup.object({
    address: yup
    .string('Enter address')
    .required('required'),
    timeslotId: yup
    .string('Select Timeslot')
    .required('required'),
    chargingDay: yup
    .string('Select day of charging')
    .required('required'),
});

const SlotSelection = (props) => {
  useEffect(() => {
    console.log(`props ${JSON.stringify(props)}`);
    document.title = 'CP- Step 1 - Slot Selection';
  }, []);

  const classes = useStyles();
  const timeslot = props.added ? props.items[0] : props.location.state ;   
  const formik = useFormik({
    initialValues: {
      address: '',
      lat: null,
      lng: null,
      sold: false,
      chargingDay: dayjs().tz('America/Los_Angeles').format('YYYY-MM-DD'),
      timeslotId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let {startTime, endTime, ...rest}  = values;

      let unixStartTime = dayjs(startTime).utc().valueOf() / 1000;
      let unixEndTime = dayjs(endTime).utc().valueOf() / 1000;
      console.log(`${unixStartTime} to ${unixEndTime}`);
      const postValues = {startTime: unixStartTime, endTime: unixEndTime, ...rest};

      console.log(JSON.stringify(postValues));
      props.clearAlerts();
      await props.addTimeslot(postValues);
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

  const { values: {lat, lng, chargingDay, timeslotId}, handleChange } = formik

  console.log(`formik ${JSON.stringify(formik.values)}`);
  return (
    <MContainer component="main" maxWidth="xs">
      <MCssBaseline />
      <div className={classes.paper}>
        <MTypography component="h1" variant="h5">
          Timeslot Selection
        </MTypography>
        {
              props.alert.message &&
                <MuiAlert elevation={6} variant="standard" severity={`${props.alert.type}`}>
                  {props.alert.message}
                </MuiAlert>
        }

        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <MDatePicker
                required
                id="chargingDay"
                name="chargingDay"
                label="Pick day of charging"
                margin="normal"
                type="date"
                format='yyyy-MM-dd'
                maxDate={dayjs().add(7, 'day')}
                minDate={dayjs()}
                value={dayjs(formik.values.chargingDay)}
                onChange={(value, notsure) => {
                  let converted = dayjs(value).format('YYYY-MM-DD');
                  formik.setFieldValue(timeslotId, null);
                  formik.setFieldValue('chargingDay', dayjs(converted));
                }}
              />
            </MuiPickersUtilsProvider>
            <MTextField
              required
              fullWidth
              variant="outlined"
              inputRef={googlePlaceRef}
              id="address"
              name="address"
              placeholder="Car location"
              onChange={formik.handleChange}
              value={formik.values.address}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <TimeslotRadioGroup {...{lat, lng, chargingDay, handleChange, timeslotId, className: classes.formControl}} />
          <MButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={formik.isSubmitting || !formik.dirty}
          >
            Next
          </MButton>
        </form>
      </div>
    </MContainer>
  );
}


function mapState(state) {
  const {loading: slotsLoading, items: slots} = state.timeslots;
  const {alert} = state;
  return {slotsLoading, slots, alert};
}

const actionCreators = {
  getTimeslots: timeslotActions.getAll,
  clearAlerts: alertActions.clear,
};

const connectedSlot = connect(mapState, actionCreators)(SlotSelection);
export {connectedSlot as SlotSelectionPage};
