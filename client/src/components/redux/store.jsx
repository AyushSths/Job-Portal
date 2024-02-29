import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser, logout } from "./slice/userSlice";
import applied_jobsReducer, { addToApplied } from "./slice/applySlice"
// Load user data from localStorage
const persistedUser = JSON.parse(localStorage.getItem('user'));
const persistedJobs = JSON.parse(localStorage.getItem("applied_jobs"));
// Create initial state with persisted user data
// const initialState = {
//     user: persistedUser || null,
// };

// Configure Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
        applied: applied_jobsReducer
    },
});

// Dispatch setUser action with loaded user data
if (persistedUser) {
    store.dispatch(setUser(persistedUser));
}

if (persistedJobs) {
    // store.dispatch(addToApplied(persistedJobs))
    persistedJobs.forEach(job => {
        store.dispatch(addToApplied(job));
    });
}

export default store;
