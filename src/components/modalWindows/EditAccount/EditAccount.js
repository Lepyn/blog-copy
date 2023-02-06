import { useDispatch, useSelector } from 'react-redux'
import styles from './EditAccount.module.scss'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { fetchUpdateUserData } from '../../../redux/blogSlice/userSlice'
import { useEffect } from 'react'

const EditAccount = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const { update } = useSelector((state) => state.user)

  const onSubmit = (data) => {
    const isValidData = {
      user: {
        username: data.Username,
        email: data.Emailaddress.toLowerCase(),
        password: data.Password,
        image: data.image,
      },
    }
    dispatch(fetchUpdateUserData(isValidData))
  }

  useEffect(() => {
    if (update) {
      reset()
      navigate('/', { replace: true })
    }
  }, [update])

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h3>Edit Account</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapperForm}>
        <label className={styles.label}>
          <span className={styles.description}> Username</span>
          <input
            type="text"
            className={styles.input}
            placeholder="Username"
            {...register('Username', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 20, message: 'Максимум 20 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.Username && <p>{errors?.Username?.message || 'Error!'}</p>}</div>
        </label>

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
                message: 'Извините, допустимы буквы (a-z), числа (0-9),  и символы (.) для продолжения',
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
        <label className={styles.label}>
          <span className={styles.description}> Avatar</span>
          <input
            type="text"
            placeholder="Avatar image"
            className={styles.input}
            {...register('image', {
              pattern: {
                value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
                message: 'адрес некорректен',
              },
            })}
          />
          <div className={styles.error}>{errors?.PasswordConfirm && <p>{errors?.PasswordConfirm?.message || 'Пароли не совпадают!'}</p>}</div>
        </label>
        <div className={styles.line}></div>

        <button type="submit" className={styles.createBtn} disabled={!isValid}>
          Edit
        </button>
      </form>
      <span className={styles.already}>
        Already have an account? <Link to="/sign-in">Sign In</Link>.
      </span>
    </div>
  )
}

export default EditAccount
