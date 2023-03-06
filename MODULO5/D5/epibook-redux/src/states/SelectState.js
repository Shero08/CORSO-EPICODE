import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: '',
}

const selectSlice = createSlice({
    name: 'selectSlice',
    initialState,
    reducers: {
        setSelected: (state, action) => {
        state.selected = action.payload
        }
    },
})

export const selectedState = (state) => state.selectBookStore.selected;
export const {setSelected} = selectSlice.actions;
export default selectSlice.reducer;

