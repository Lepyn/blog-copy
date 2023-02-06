import { configureStore } from '@reduxjs/toolkit'
import getpostSlice from './blogSlice/articlesSlice'
import getUserSlice from './blogSlice/userSlice'

export default configureStore({
  reducer: {
    posts: getpostSlice,
    user: getUserSlice,
  },
})
