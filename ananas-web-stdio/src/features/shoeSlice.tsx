import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shoe {
  id: string;
}

interface ShoeState {
  list: Shoe[];
}

const initialState: ShoeState = {
  list: [],
};

const shoeSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    setShoe: (state, action: PayloadAction<Shoe[]>) => {
      state.list = action.payload;
    },
    createShoe: (state, action: PayloadAction<Shoe[]>) => {
      state.list = action.payload;
    },
    updateShoe: (state, action: PayloadAction<Shoe[]>) => {
      state.list = action.payload;
    },
    deleteShoe: (state, action: PayloadAction<string>) => {
      const deletedItemId = action.payload;
      state.list = state.list.filter(item => item.id !== deletedItemId);
    },
  },
});

export const { setShoe, deleteShoe ,createShoe, updateShoe} = shoeSlice.actions;
export const selectShoe = (state: { shoes: ShoeState }) => state.shoes;
export default shoeSlice.reducer;
