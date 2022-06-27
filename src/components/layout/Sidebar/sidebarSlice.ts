import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
  open: boolean;
  miniOpen: boolean;
}

// Define the initial state using that type
const initialState: SidebarState = {
  open: true,
  miniOpen: true,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    openToggle: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    miniOpenToggle: (state, action: PayloadAction<boolean>) => {
      state.miniOpen = action.payload;
    },
  },
});

export const { openToggle, miniOpenToggle } = sidebarSlice.actions;

export default sidebarSlice.reducer;
