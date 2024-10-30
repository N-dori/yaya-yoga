import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface AlertBoxState {
  userMsg:string
  isAlertBoxShown:boolean
  func?:()=>void

}

// Define the initial state using that type
const initialState: AlertBoxState = {
    userMsg:'',
    isAlertBoxShown:false,
}

export const alertSlice = createSlice({
  name: 'alert box ',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    callAlertBox : (state, action: PayloadAction<any>) => {
        state.isAlertBoxShown = true;
        state.userMsg = action.payload.msg
      },
    

    hideAlertBox: (state) => {
        state.isAlertBoxShown = false;
      }

  }
})

export const { callAlertBox ,hideAlertBox} = alertSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAlertBox  = (state: RootState) => state.alertBoxSlice
export default alertSlice.reducer