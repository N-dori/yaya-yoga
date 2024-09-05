import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
export interface MsgState {
  bgColor:string
  userMsg:string
  isMsgShown:boolean
  sucsses:boolean
}

// Define the initial state using that type
const initialState: MsgState = {
    sucsses:false,
    bgColor:'green',
    userMsg:'',
    isMsgShown:false,
}

export const msgSlice = createSlice({
  name: 'user msg',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setColor: (state) => {
  
    if(state.userMsg){
             state.bgColor = (state.sucsses) ? "rgb(18, 199, 57)" : 'red'

    }},
    callUserMsg:( state , action)=> {
        console.log('action :',action);
        
        state.isMsgShown = true
        state.userMsg = action.payload.msg
        state.sucsses = action.payload.isSucsses
        state.bgColor = action.payload ? "rgb(18, 199, 57)" : 'red'
    
    }
    ,

    hideUserMsg: (state) => {
        state.isMsgShown = false;
      }

  }
})

export const { callUserMsg ,hideUserMsg} = msgSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUserMsg = (state: RootState) => state.userMsgSlice.userMsg

export default msgSlice.reducer