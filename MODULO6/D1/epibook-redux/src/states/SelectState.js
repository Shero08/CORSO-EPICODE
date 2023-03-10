import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    selected: '',
    comments: [],
    isLoading: false,
    error: null,
}

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RhYjg0ODJiMDAxNTAwMTU5YThiNjgiLCJpYXQiOjE2NzgxOTI3MjksImV4cCI6MTY3OTQwMjMyOX0.rIU7-vqg3e79nmNSU9MaGUNsKpIwf24YqI0mclBscko'

export const getBookComment = createAsyncThunk(
    'bookComments/getBookComments',
    async (id) => {
        try {
            const data = await fetch(
                `https://striveschool-api.herokuapp.com/api/comments/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const response = await data.json()
            return response

        } catch (error) {
            if (error) throw error
        }
    }
)

const selectSlice = createSlice({
    name: 'selectSlice',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookComment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getBookComment.fulfilled, (state, action) =>{
                state.isLoading = false
                state.comments = action.payload
            })
            .addCase(getBookComment.rejected, (state) => {
                state.isLoading = false
                state.error = 'Errore! non hai i tuoi dati'
            })
    }
})

export const selectedState = (state) => state.selectBookStore.selected
export const selectedStateLoading = (state) => state.selectBookStore.isLoading
export const selectedStateComments = (state) => state.selectBookStore.comments
export const selectedStateError = (state) => state.selectBookStore.error
export const { setSelected } = selectSlice.actions
export default selectSlice.reducer
