import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    turfs: [],
    loading: true,
    error:null
}

const turfSlice = createSlice({
    name: "turf",
    initialState,
    reducers:{
        setTurfs: (state, action) => {
            state.turfs = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
})

export const {setTurfs, setLoading, setError} = turfSlice.actions;
export default turfSlice.reducer;