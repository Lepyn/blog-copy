import styles from './AuthAccount.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserGetAuth } from '../../../redux/blogSlice/userSlice'
import { useNavigate, Link } from 'react-router-dom'

const AuthAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuth, isReg, error, status } = useSelector((state) => state.user)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = (data) => {
    const isLoginData = {
      user: {
        email: data.Emailaddress.toLowerCase(),
        password: data.Password,
      },
    }
    dispatch(fetchUserGetAuth(isLoginData))
    reset()
  }

  useEffect(() => {
    if (isAuth) {
      navigate('/', { replace: true })
      reset()
    }
  }, [isAuth])

  // if (isAuth || isReg) {
  //   return children
  // }
  // if (!isAuth || !isReg) {
  //   return <Navigate to="../sign-in" />
  // }

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>Sign In</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapperForm}>
        <label className={styles.label}>
          <span className={styles.description}> Email address</span>
          <input
            className={styles.input}
            placeholder=" Email address"
            {...register('Emailaddress', {
              required: 'Поле обязательно для заполнения',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Sorry, only letters (a-z), numbers(0-9), and periods (.) are allowed',
              },
            })}
          ></input>
          <div className={styles.error}>{errors?.Emailaddress && <p>{errors?.Emailaddress?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.description}> Password</span>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            {...register('Password', {
              required: 'Поле обязательно для заполнения',

              minLength: { value: 6, message: 'Минимум 6 символов' },
              maxLength: { value: 40, message: 'Максимум 40 символов' },
            })}
          ></input>
          <div className={styles.error}>{errors?.Password && <p>{errors?.Password?.message || 'Error!'}</p>}</div>
        </label>
        <button type="submit" className={styles.createBtn} disabled={!isValid}>
          Login
        </button>
      </form>
      <span className={styles.already}>
        Don’t have an account? <Link to={'/sign-up'}>Sign Up.</Link>
      </span>
    </div>
  )
}

export default AuthAccount
