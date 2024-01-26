import { createSlice } from "@reduxjs/toolkit";

const shoeSlice = createSlice({
    name: 'shoes',
    initialState:{
        list: []
    } ,
    reducers: {
        setShoe: (state , action) => {
            state.list = action.payload
        }
    }
})
export const {setShoe} = shoeSlice.actions
export const selectShoe = (state: any) => state.shoes;
export default shoeSlice.reducer
 