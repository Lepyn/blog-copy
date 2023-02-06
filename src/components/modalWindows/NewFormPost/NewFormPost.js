import styles from './NewFormPost.module.scss'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetNewArticle, fetchEditOwnArticle, updateSendPost } from '../../../redux/blogSlice/articlesSlice'
import { useNavigate } from 'react-router-dom'
import { updateIsEdit } from '../../../redux/blogSlice/userSlice'

const NewFormPost = ({ title, titleArticle, description, body, tagList, slug }) => {
  console.log('NewFormPost slug', slug)
  const [tags, setTags] = useState([''])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sendPost, editPost } = useSelector((state) => state.posts)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    getValues,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      title: titleArticle || '',
      description: description || '',
      body: body || '',
      tagList: tagList || [{ name: '' }],
    },
  })

  const onSubmit = (data) => {
    const validData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((tag) => tag.name),
        slug: data.slug,
      },
    }

    const slugData = {
      validData,
      slug,
    }

    if (slug) {
      console.log(slugData, 'slugData')
      dispatch(fetchEditOwnArticle(slugData))
    } else {
      dispatch(fetchGetNewArticle(validData))
      // dispatch(updateSendPost())
    }
  }

  // useEffect(() => {
  //   if (sendPost) {
  //     dispatch(updateSendPost())
  //   }
  //   if (editPost) {
  //     dispatch(updateIsEdit())
  //   }
  // }, [])

  useEffect(() => {
    sendPost ? navigate('/', { replace: true }) : editPost && navigate('/', { replace: true })
    // if (sendPost) {
    //   dispatch(updateSendPost())
    // }
    // if (editPost) {
    //   dispatch(updateIsEdit())
    // }
  }, [sendPost, editPost])

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  return (
    <div className={styles.containerNewPost}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutArticle}>
        <label className={styles.label}>
          <span className={styles.labelSpan}> Title</span>
          <span>{title}</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 50, message: 'Максимум 50 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Short description</span>
          <input
            // id="inputTitle"
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 300, message: 'Максимум 300 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Text</span>
          <input
            className={styles.inputText}
            type="text"
            placeholder="Text"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 1000, message: 'Максимум 1000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
        </label>
        {/* <span className={styles.labelSpan}> </span> */}
        <label className={styles.label}>
          <span> Tags</span>
          <div className={styles.wrapperTag}>
            {fields.map((field, index) => (
              <div className={styles.wrap} key={field.id}>
                <div className={styles.tagLabel}>
                  <input
                    type="text"
                    placeholder="Tag"
                    className={styles.inputTag}
                    {...register(`tagList.${index}.name`, {
                      required: 'The tag must not be empty, fill in or delete',
                      pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: 'You can only use English letters and numbers without spaces or other characters',
                      },
                      validate: (tagInputValue) =>
                        !getValues()
                          .tagList.map((tagObject) => tagObject.name)
                          .filter((_, currentChangingTagIndex) => index !== currentChangingTagIndex)
                          .includes(tagInputValue) || 'Tags must be unique',
                    })}
                  />
                  {errors?.tagList?.[index] && <p className={styles.error}>{errors?.tagList?.[index]?.name?.message?.toString()}</p>}
                </div>
                <Button type="primary" danger ghost className={styles.wrapperBtnDel} style={{ marginRight: '8px' }} onClick={() => remove(index)}>
                  Delete
                </Button>
              </div>
            ))}
            <Button
              type="primary"
              ghost
              className={styles.wrapperBtnAdd}
              onClick={() => {
                append({
                  name: '',
                })
              }}
            >
              Add tag
            </Button>
          </div>
          {/* {tags.map((btn, index) => (
            <div className={styles.wrapperSend} key={index}>
              <input
                type="text"
                placeholder="Tag"
                value={btn}
                className={styles.inputTag}
                onChange={(e) => handleTagChange(e, index)}
                // {...register('tag', {
                //   required: false,
                //   maxLength: { value: 3000, message: 'Максимум 3000 символов' },
                //   minLength: { value: 3, message: 'Минимум 3 символа' },
                // })}
              />
              {tags.length > 1 && (
                <button type="button" className={styles.wrapperBtnDel} onClick={() => handleDeleteBtn(index)}>
                  Delete
                </button>
              )}
              {tags.length - 1 === index && tags.length < 4 && (
                <button type="button" className={styles.wrapperBtnAdd} onClick={handleAddBtn}>
                  Add tag
                </button>
              )}
            </div>
          ))} */}
          <button type="submit" className={styles.send} disabled={!isValid}>
            Send
          </button>
        </label>
      </form>
    </div>
  )
}
export default NewFormPost