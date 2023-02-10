import styles from './Layout.module.scss'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLogout, updateIsEdit, currentImg } from '../../redux/blogSlice/userSlice'
import avatar from '../../img/avatar.png'
import { path } from '../../assets/path'

const Layout = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.user)
  const { username, image } = useSelector((state) => state.user.user)
  const checkOurPhoto = () => {
    dispatch(currentImg())
    alert('Ошибка во время загрузки изображения, не верная ссылка!')
  }
  return (
    <>
      <header className={styles.containerHeader}>
        <Link className={styles.mainTitle} to="/">
          Realworld Blog
        </Link>
        {!isAuth ? (
          <div className={styles.containerBtn}>
            <Link to={`/${path.signIn}`} className={styles.signInBtn}>
              sign-in
            </Link>
            <Link to={`/${path.signUp}`} className={styles.signUpBtn}>
              sign-up
            </Link>
          </div>
        ) : (
          <div className={styles.containerProfile}>
            <Link to={`${path.newArticle}`} className={styles.createArticle}>
              create Article
            </Link>
            <Link to={`/${path.profile}`} onClick={() => dispatch(updateIsEdit())} className={styles.headerAuth}>
              <span className={styles.userName}>{username}</span>
              <img onError={checkOurPhoto} className={styles.imgProfile} src={image || avatar} />
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
