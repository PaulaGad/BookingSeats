import * as api from '../api/index';
import { FETCH_ALL_SEATS, SELECT_SEAT } from '../constants/actionTypes';

export const getSeats = async (dispatch, getState) => {
  try {
    const { data } = await api.fetchSeats();
    dispatch({ type: FETCH_ALL_SEATS, payload: data });
  } catch (error) {
    console.error(error);
  }
};
 
export const selectSeat = (id) => async (dispatch) => {
  try {
    await dispatch({ type: SELECT_SEAT, payload: id });
  } catch (error) {
    console.error(error);
  }
};
