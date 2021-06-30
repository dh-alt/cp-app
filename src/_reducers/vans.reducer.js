import {vanConstants} from '../_constants';

export function vans(state = {}, action) {
  switch (action.type) {
    case vanConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case vanConstants.GETALL_SUCCESS:
      return {
        items: action.vans,
      };
    case vanConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    case vanConstants.ADD_REQUEST:
      return {
        adding: true,
      }  
    case vanConstants.ADD_SUCCESS:
      return {
        added: true,
        items: [action.van]
      };
    case vanConstants.ADD_FAILURE:
      return {
        error: action.error,
      }
    case vanConstants.EDIT_REQUEST:
      return {
        editing: true,
      }  
    case vanConstants.EDIT_SUCCESS:
      return {
        edited: true,
        items: [action.van]
      };
    case vanConstants.EDIT_FAILURE:
      return {
        error: action.error,
      }
    case vanConstants.DELETE_REQUEST:
    // add 'deleting:true' property to van being deleted
      return {
        ...state,
        items: state.items.map((van) =>
          van.id === action.id ?
            {...van, deleting: true} :
            van,
        ),
      };
    case vanConstants.DELETE_SUCCESS:
      // remove deleted van from state
      return {
        items: state.items.filter((van) => van.id !== action.id),
      };
    case vanConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to van
      return {
        ...state,
        items: state.items.map((van) => {
          if (van.id === action.id) {
            // make copy of van without 'deleting:true' property
            // eslint-disable-next-line no-unused-vars
            const {deleting, ...vanCopy} = van;
            // return copy of van with 'deleteError:[error]' property
            return {...vanCopy, deleteError: action.error};
          }

          return van;
        }),
      };
    default:
      return state;
  }
}
