import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {alertActions, timeslotActions} from '../_actions';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import MFormControl from '@material-ui/core/FormControl';
import MFormLabel from '@material-ui/core/FormLabel';
import MRadio from '@material-ui/core/Radio';
import MRadioGroup from '@material-ui/core/RadioGroup';
import MFormControlLabel from '@material-ui/core/FormControlLabel';

dayjs.extend(utc);
dayjs.extend(timezone)

const TimeslotRadio = (props) => {
  console.log(`all props ${JSON.stringify(props)}`);
  const { lat, lng, chargingDay, timeslotId, handleChange } = props;

  useEffect(async () => {
    let isCurrent = true;

    if (!!lat && !!chargingDay) {
      await props.getTimeslots();
    }
    return () => {
      isCurrent = false;
    };
  }, [lat, chargingDay]);

  const radioOptions = (slots) => {
    let options = []
    if(!!slots){
      slots.map((slot, key) => {
        let slotName = dayjs.unix(slot.startTime).format('hh:mm A') + ' - ' + dayjs.unix(slot.endTime).format('hh:mm A');
        options.push(
          <div key={key}>
          <MFormControlLabel value={slot.id} control={<MRadio />} disabled={slot.sold} label={`${slotName}`}/>
          <br/>
          <em>Fee ${slot.amount} + Surcharge ${slot.surcharge} - Discount ${slot.discount}</em><br/>

          </div>
        )
      })
    }
    return options;
  }
  return (
    <MFormControl className={props.className}>
      <MFormLabel>{'Timeslots'}</MFormLabel>
      {
        !props.slotsLoaded && !props.slotsLoading && (<em>Provide Day and Location to see slots</em>)
      }
      {
        props.slotsLoaded && (props.slots.length == 0) && (<em>No slots found.</em>)
      }
      {
        props.slotsLoading && (<em>Loading...</em>)
      }
      <MRadioGroup aria-label="available-slots" name="timeslotId" value={timeslotId} onChange={handleChange}>
        {radioOptions(props.slots)}
      </MRadioGroup>
    </MFormControl>
  );
};

function mapState(state) {
  const {loading: slotsLoading, items: slots, loaded: slotsLoaded} = state.timeslots;
  const {alert} = state;
  return {slotsLoading, slotsLoaded, slots, alert};
}

const actionCreators = {
  getTimeslots: timeslotActions.getAll,
  clearAlerts: alertActions.clear,
};

const connectedTimeslotRadio = connect(mapState, actionCreators)(TimeslotRadio);
export {connectedTimeslotRadio as TimeslotRadioGroup};
