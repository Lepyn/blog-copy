import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import '@fontsource/source-sans-pro'
import PostList from '../PostList/PostList'
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateAccount from '../modalWindows/CreateAccount/CreateAccount'
import CreateNewPost from '../CreateNewPost/CreateNewPost'
import LoginAccount from '../modalWindows/AutAccount/AuthAccount'
import EditPost from '../modalWindows/EditPost/EditPost'
import FullPost from '../modalWindows/FullPost/FullPost'
import Layout from '../Layout/Layout'
import EditAccount from '../modalWindows/EditAccount/EditAccount'
import { fetchHoldUserAfterUpdate } from '../../redux/blogSlice/userSlice'
import { path } from '../../assets/path'
const App = () => {
  const dispatch = useDispatch()
  const { isAuth, isReg } = useSelector((state) => state.user)

  const refreshPage = () => {
    if (localStorage.getItem('token')) {
      dispatch(fetchHoldUserAfterUpdate())
    } else {
      return
    }
  }
  useEffect(() => {
    refreshPage()
  }, [])

  const PrivateRoute = ({ children }) => {
    return isReg || isAuth ? children : <Navigate to="../sign-in" />
  }
  console.log(isReg, isAuth)
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PostList />} />
          <Route index path={`${path.articles}`} element={<PostList />} />
          <Route path={`${path.articles}/:slug`} element={<FullPost />} />
          <Route path={`${path.signIn}`} element={<LoginAccount />} />
          <Route path={`${path.signUp}`} element={<CreateAccount />} />
          <Route
            path={`${path.profile}`}
            element={
              <PrivateRoute>
                <EditAccount />
              </PrivateRoute>
            }
          />
          <Route
            path={`${path.articles}/:slug/edit`}
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route
            path={`${path.newArticle}`}
            element={
              <PrivateRoute>
                <CreateNewPost />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
