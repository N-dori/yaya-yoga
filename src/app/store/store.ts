import { configureStore } from '@reduxjs/toolkit'
import msgSlice from './features/msgSlice'
import  alertSlice  from './features/alertBoxSlice'
import userSlice  from './features/userSlice'
import periodicAgendaSilce  from './features/periodicAgendaSilce'

export const makeStore = () => {
  return configureStore({
    reducer: {
      userMsgSlice:msgSlice,
      alertBoxSlice:alertSlice,
      currUserSlice:userSlice,
      periodicAgendaSilce:periodicAgendaSilce,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']