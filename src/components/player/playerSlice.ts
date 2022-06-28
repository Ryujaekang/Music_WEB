import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { SetLocalStorage, GetLocalStorage } from '@lib/storage';
import { options } from '@app/options';

// Define a type for the slice state
interface PlayerState {
  playlist: any;
  // options: any;
}

// Define the initial state using that type
const initialState: PlayerState = {
  playlist: [],
  // options: options,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // setOptions: (state, action: PayloadAction) => {
    //   state.options = { ...state.options, ...action.payload };
    // },
    setPlaylist: (state, action: PayloadAction) => {
      console.log('action.payload', action.payload);
      // state.playlist = state.playlist.concat(action.payload);
      if (action.payload.length > 0) {
        state.playlist = [...state.playlist, ...action.payload];
      } else {
        state.playlist = [...state.playlist, action.payload];
      }
    },
  },
});

export const { setOptions, setPlaylist } = playerSlice.actions;

export default playerSlice.reducer;
