import styles from './Layout.module.scss'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLogout, updateIsEdit } from '../../redux/blogSlice/userSlice'
import { updateSendPost } from '../../redux/blogSlice/articlesSlice'
import avatar from '../../img/avatar.png'

const Layout = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.user)
  const { username, image } = useSelector((state) => state.user.user)

  return (
    <>
      <header className={styles.containerHeader}>
        <Link className={styles.mainTitle} to="/">
          Realworld Blog
        </Link>
        {!isAuth ? (
          <div className={styles.containerBtn}>
            <Link to="/sign-in" className={styles.signInBtn}>
              sign-in
            </Link>
            <Link to="/sign-up" className={styles.signUpBtn}>
              sign-up
            </Link>
          </div>
        ) : (
          <div className={styles.containerProfile}>
            <Link to="new-article" className={styles.createArticle}>
              create Article
            </Link>
            <Link to="/profile" onClick={updateIsEdit()} className={styles.headerAuth}>
              <span className={styles.userName}>{username}</span>
              <img className={styles.imgProfile} src={image || avatar} />
            </Link>
            <Link to="/" onClick={() => dispatch(updateLogout())} className={styles.logOut}>
              Log out
            </Link>
          </div>
        )}
      </header>

      <div className={styles.app}>
        <main className={styles.containerMain}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
