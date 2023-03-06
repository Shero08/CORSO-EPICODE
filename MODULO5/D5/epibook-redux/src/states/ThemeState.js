import { createSlice } from "@reduxjs/toolkit";

const session = JSON.parse(localStorage.getItem('theme'))

const initialState = {
    theme: session
}

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            const newTheme = action.payload
            localStorage.setItem('theme', JSON.stringify(newTheme))
            return { ...state, theme: newTheme }
        }
    }
})

export const changeTheme = (state) => state.themeStore.theme
export const {setTheme} = themeSlice.actions
export default themeSlice.reducer