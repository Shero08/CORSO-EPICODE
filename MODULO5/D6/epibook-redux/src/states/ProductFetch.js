import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try{
            const data = await fetch('https://striveschool-api.herokuapp.com/books')
            const response = await data.json();
            return response
        }
        catch(error){
            if(error) throw error 
        }
    }
)

const productSlice = createSlice({
    name: 'allProducts',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(getProducts.rejected, (state) => {
                state.isLoading = true
                state.error = 'Errore durante la ricezione dei dati!'
            })
    }
})

export const productsState = (state) => state.productsStore.products
export const productsStateLoading = (state) => state.productsStore.isLoading
export const productsStateError = (state) => state.productsStore.error
export default productSlice.reducer