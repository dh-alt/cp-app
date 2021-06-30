import {timeslotConstants} from '../_constants';

export function timeslots(state = {}, action) {
  switch (action.type) {
    case timeslotConstants.GETALL_REQUEST:
      return {
        loading: true,
        items: [],
      };
    case timeslotConstants.GETALL_SUCCESS:
      return {
        items: action.timeslots,
        loaded: true,
      };
    case timeslotConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case timeslotConstants.ADD_REQUEST:
      return {
        adding: true,
      }  
    case timeslotConstants.ADD_SUCCESS:
      return {
        added: true,
        items: [action.timeslot]
      };
    case timeslotConstants.ADD_FAILURE:
      return {
        error: action.error,
      }
    case timeslotConstants.EDIT_REQUEST:
      return {
        editing: true,
      }  
    case timeslotConstants.EDIT_SUCCESS:
      return {
        edited: true,
        items: [action.timeslot]
      };
    case timeslotConstants.EDIT_FAILURE:
      return {
        error: action.error,
      }
    case timeslotConstants.DELETE_REQUEST:
    // add 'deleting:true' property to timeslot being deleted
      return {
        ...state,
        items: state.items.map((timeslot) =>
          timeslot.id === action.id ?
            {...timeslot, deleting: true} :
            timeslot,
        ),
      };
    case timeslotConstants.DELETE_SUCCESS:
      // remove deleted timeslot from state
      return {
        items: state.items.filter((timeslot) => timeslot.id !== action.id),
      };
    case timeslotConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to timeslot
      return {
        ...state,
        items: state.items.map((timeslot) => {
          if (timeslot.id === action.id) {
            // make copy of timeslot without 'deleting:true' property
            // eslint-disable-next-line no-unused-vars
            const {deleting, ...timeslotCopy} = timeslot;
            // return copy of timeslot with 'deleteError:[error]' property
            return {...timeslotCopy, deleteError: action.error};
          }

          return timeslot;
        }),
      };
    default:
      return state;
  }
}
