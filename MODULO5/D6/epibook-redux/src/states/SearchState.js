import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
    inputValue: '',
    products: [],
    filteredProducts: [],
    isLoading: false,
    error: null,
}

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        try {
            const data = await fetch(
                'https://striveschool-api.herokuapp.com/books'
            )
            const response = await data.json()
            return response
        } catch (error) {
            if (error) throw error
        }
    }
)

const searchSlice = createSlice({
    name: 'searchSlice',
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
    },
    reducers: {
        setInput: (state, action) => {
            state.inputValue = action.payload
        },
        filterBooks: (state, action) => {
            const searchTerm = state.inputValue.toLowerCase()
            const filteredItems = state.products.filter((elem) => {
                return elem.title
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            })
            state.filteredProducts = filteredItems
        },
    },
})

export const productsState = (state) => state.searchStore.products
export const productsStateLoading = (state) => state.searchStore.isLoading
export const productsStateError = (state) => state.searchStore.error
export const setInputState = (state) => state.searchStore.inputValue
export const filteredProductsState = (state) =>
    state.searchStore.filteredProducts
export const { setInput, filterBooks } = searchSlice.actions //esporto azioni
export default searchSlice.reducer
