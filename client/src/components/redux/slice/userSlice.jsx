import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setUser: (state, action) => {
            console.log("Set User");
            state.value = action.payload
        },
        logout: (state) => {
            localStorage.clear()
            state.value = null
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions

export default userSlice.reducer

