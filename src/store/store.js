import { createSlice, configureStore } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null
  },
  reducers: {
    loginUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.user = action.payload
    },
    logoutUser: state => {
      state.user = null
    }
  }
})

export const { loginUser, logoutUser } = authSlice.actions

const store = configureStore({
  reducer: authSlice.reducer
})

export default store;