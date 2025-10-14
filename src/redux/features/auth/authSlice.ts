import { createSlice } from '@reduxjs/toolkit'
import type { TUser } from '../../../interfaces/auth';
// import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface authState {
    user: TUser | null;
    token: string | null;

}

// Define the initial state using that type
const initialState: authState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token

        },
        logOut: (state) => {
            state.user = null;
            state.token = null

        },


    },
})

export const { setUser, logOut } = authSlice.actions


export default authSlice.reducer