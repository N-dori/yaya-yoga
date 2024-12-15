import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { TperiodicAgenda } from '@/app/types/types'

// Define a type for the slice state
export interface periodicAgendaState {
  periodicAgenda:TperiodicAgenda
}

// Define the initial state using that type
const initialState: periodicAgendaState = {
  periodicAgenda:null
}

export const periodicAgendaSilce = createSlice({
  name: 'periodicAgenda ',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    setPeriodicAgenda: (state, action: PayloadAction<any>) => {
        console.log('action ',action);
        
        state.periodicAgenda = action.payload.periodicAgenda

      },
  }
})

export const { setPeriodicAgenda} = periodicAgendaSilce.actions

// Other code such as selectors can use the imported `RootState` type
export const selectPeriodicAgenda = (state: RootState) => state.periodicAgendaSilce.periodicAgenda

export default periodicAgendaSilce.reducer