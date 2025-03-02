import { configureStore, createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
    name: 'products',
    initialState: { items: [] },
    reducers: {
        addProduct: (state, action) => {}
    }
})

export const { addProduct } = productSlice.actions

export const store = configureStore({
    reducer: {
        products: productSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
