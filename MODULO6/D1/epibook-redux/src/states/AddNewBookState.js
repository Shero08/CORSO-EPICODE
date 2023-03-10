import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    postResponse: null,
    isLoading: false,
    postError: null
}

const postData = createAsyncThunk(
    'book/postBooks',
    async (data) => {
        try {
            const books = await fetch('http://localhost:3030/books', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            return books.json()
        } 
        catch (error) {
            if(error) throw error    
        }
    }
)

const newBookSlice = createSlice({
    name: 'newBookSlice',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(postData.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postData.fulfilled, (state) => {
                state.isLoading = false
                state.postResponse = 'Il libro è stato aggiunto con successo'
            })
            .addCase(postData.rejected, (state => {
                state.isLoading = false
                state.postError = 'Errore! non hai inserito il nuovo libro'
            }))
    }
})

export const postBookLoading = (state) => state.bookStore.isLoading;
export const postNewBook = (state) => state.bookStore.postResponse;
export const postBookError = (state) => state.bookStore.postError;
export default newBookSlice.reducer 