import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface AlertBoxState {
  userMsg:string
  isAlertBoxShown:boolean
  btnTxt:''
  func?:()=>void

}

// Define the initial state using that type
const initialState: AlertBoxState = {
    userMsg:'',
    isAlertBoxShown:false,
    btnTxt:''
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
    setBtnTxt : (state, action: PayloadAction<any>) => {      
        state.btnTxt = action.payload;
      },
    setFunc : (state, action: PayloadAction<any>) => {    
      console.log('action.payload',action.payload);
        
        state.func = action.payload;
      },
    clearTxts: (state) => {
      state.userMsg = ''
      state.btnTxt = ''
    },

    hideAlertBox: (state) => {
        state.isAlertBoxShown = false;
      }

  }
})

export const { callAlertBox ,hideAlertBox,setBtnTxt,clearTxts ,setFunc} = alertSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAlertBox  = (state: RootState) => state.alertBoxSlice
export default alertSlice.reducer