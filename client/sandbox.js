import { createSlice, configureStore } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    data: []
  },
  reducers: {
    incremented: (state) => {
      state.value += 1
    },
    decremented: (state) => {
      state.value -= 1
    },
    fetchData: (state, action) => {
        state.data = [action.payload]
    }
  }
})

const {incremented, decremented, fetchData} = counterSlice.actions

const store = configureStore({
    reducer: counterSlice.reducer
})

console.log(store.getState())

store.dispatch(incremented())

store.dispatch(incremented())
store.dispatch(incremented())
store.dispatch(decremented())
store.dispatch(fetchData({masuk: `enak`}))
console.log(store.getState())