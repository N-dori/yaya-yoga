import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface UserState {
  user:any

}

// Define the initial state using that type
const initialState: UserState = {
    user:null
}

export const userSlice = createSlice({
  name: 'user ',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setUser : (state, action: PayloadAction<any>) => {
      console.log('hi from store user : ',action.payload);
      
        state.user = action.payload
      },
    

  }
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.currUserSlice.user
export default userSlice.reducer