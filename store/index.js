import { configureStore, createStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
	notiState: { title: "", message: "", status: "" },
	otherState: "default Other State",
};

//creating the redux slice
const notificationSlice = createSlice({
	name: "notiState",
	initialState: initialState,
	reducers: {
		//replacement for reducers 'switch' cases (in normal redux)
		/* pending(state) {
      return {...state, notiState: 'pending'}
    }, */
		showNotification(state, action) {
			const { title, message, status } = action.payload;

			return {
				...state,
				notiState: { title, message, status },
			};
		},

		hideNotification(state) { //resetting to false ('') the status
			return {
				...state, 
				notiState: {...state.notiState, status: ''}
			}
		}
		/*  error(state, action) {
      return {...state, notiState: action.payload.sms}
    }, */
	},
});

//creating the main store

const store = configureStore({
	reducer: notificationSlice.reducer,
});

//way if adding multiple reducers (combined)
/* const store = configureStore({
  reducer: {notiState: notificationSlice.reducer}
}); */

//exporting the store actions
export const notificationActions = notificationSlice.actions;

//exporting the main store as default.
export default store;
