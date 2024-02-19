import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: []
}

export const applySlice = createSlice({

    name: 'applied_jobs',
    initialState,
    reducers: {
        addToApplied: (state, action) => {
            console.log("set - applied ")
            console.log(action.payload);
            // state.value.push(action.payload)s

            let { _id, name, categorey, description, company, jobLevel, noOfVacancy, location, offeredSalary, deadline, type, createdAt, image, appliedBy } = action.payload

            /* check if the clicked product already exits in our redux store */

            let existing_product = state.value.find(job_item => job_item._id == _id)

            if (existing_product) {

                alert("This job has been applied before")
                return;

            } else {

                state.value.push({
                    _id, name, categorey, description, company, jobLevel, noOfVacancy, location, offeredSalary, deadline, type, createdAt, image, appliedBy
                })
            }

        },
        remove: (state, action) => {
            let index = state.value.indexOf(action.payload)
            state.value.splice(index, 1)

        }
    }
})

export const { addToApplied, remove } = applySlice.actions

export default applySlice.reducer

