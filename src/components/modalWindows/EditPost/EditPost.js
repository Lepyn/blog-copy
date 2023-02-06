import { useSelector } from 'react-redux'
import NewFormPost from '../NewFormPost/NewFormPost'
import { useParams } from 'react-router-dom'
import styles from './EditPost.module.scss'

const EditPost = () => {
  const { article } = useSelector((state) => state.posts)
  console.log(article, 'article EditPost')
  const { slug } = useParams()
  console.log(article.slug, 'article EditPost')
  console.log()
  return (
    <div>
      <NewFormPost
        title={'Edit Post'}
        titleArticle={article.title}
        description={article.description}
        body={article.body}
        tagList={article.tagList.map((tag) => ({ name: tag }))}
        slug={article.slug}
      />
    </div>
  )
}
export default EditPost

// import { useLocation, useNavigate, useParams } from 'react-router'
// import styles from './EditPost.module.scss'
// import { useForm, useFieldArray } from 'react-hook-form'
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchEditOwnArticle } from '../../../redux/blogSlice/articlesSlice'

// const EditPost = (props) => {
//   console.log(props, 'EditPost PROPS')
//   const location = useLocation()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   // const [tags, setTags] = useState([''])
//   const { title, description, tagList, body, key } = location.state
//   // const { slug } = useParams()
//   const { article, editPost, status, error } = useSelector((state) => state.posts)
//   // const { slug } = useSelector((state) => state.user.user)
//   console.log(article, 'article')

//   const {
//     register,
//     formState: { errors, isValid },
//     handleSubmit,
//     reset,
//     control,
//     getValues,
//   } = useForm({
//     mode: 'onChange',
//     defaultValues: {
//       title: title || '',
//       description: description || '',
//       body: body || '',
//       tagList: tagList || [{ name: '' }],
//     },
//   })
//   const { fields, append, remove } = useFieldArray({
//     name: 'tagList',
//     control,
//   })

//   const onSubmit = (data) => {
//     const isValidData = {
//       article: {
//         title: data.title,
//         description: data.description,
//         body: data.body,
//         tagList: data.tagList.map((tag) => tag.name),
//       },
//     }
//     // const slugData = {
//     //   isValidData,
//     //   key,
//     // }
//     // if (key) {
//     dispatch(fetchEditOwnArticle(key, isValidData))
//     // }

//     // reset()
//   }
//   console.log(editPost, 'editPost DO useEffect')
//   useEffect(() => {
//     if (editPost) {
//       console.log(editPost, 'editPost v useEffect')
//       reset()
//       navigate('/', { replace: true })
//     }
//     reset()
//   }, [editPost])

// const handleAddBtn = () => {
//   setTags([...tags, ''])
// }

// const handleDeleteBtn = (index) => {
//   const list = [...tags]
//   list.splice(index)
//   setTags(list)
// }

// const handleTagChange = (e, index) => {
//   let { value } = e.target
//   let list = [...tags]
//   list[index] = value
//   setTags(list)
// }

// console.log(editPost)

//   return (
//     <div className={styles.containerNewPost}>
//       {status === 'Error' ? <div>{error}</div> : ''}
//       <span className={styles.title}>Edit Post </span>
//       <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutArticle}>
//         <label className={styles.label}>
//           <span className={styles.labelSpan}>Title</span>
//           <input
//             className={styles.input}
//             defaultValue={title}
//             {...register('title', {
//               required: 'Поле обязательно для заполнения',
//               maxLength: { value: 1000, message: 'Максимум 1000 символов' },
//               minLength: { value: 3, message: 'Минимум 3 символа' },
//             })}
//           ></input>
//         </label>
//         <label className={styles.label}>
//           <span className={styles.labelSpan}>Description</span>
//           <input
//             className={styles.input}
//             defaultValue={description}
//             {...register('description', {
//               required: 'Поле обязательно для заполнения',
//               maxLength: { value: 3000, message: 'Максимум 3000 символов' },
//               minLength: { value: 3, message: 'Минимум 3 символа' },
//             })}
//           ></input>
//         </label>
//         <label className={styles.label}>
//           <span className={styles.labelSpan}>Text</span>
//           <input
//             className={styles.inputText}
//             defaultValue={body}
//             {...register('body', {
//               required: 'Поле обязательно для заполнения',
//               maxLength: { value: 3000, message: 'Максимум 3000 символов' },
//               minLength: { value: 3, message: 'Минимум 3 символа' },
//             })}
//           ></input>
//         </label>
//         <span className={styles.labelSpan}>Tags</span>
//         <label className={styles.wrapperTag}>
//           {fields.map((field, index) => (
//             <>
//               <div key={field.id}>
//                 <input
//                   type="text"
//                   placeholder="Tag"
//                   className={styles.tag}
//                   {...register(`tagList.${index}.name`, {
//                     required: 'Тег не должен быть пустой, заполните или удалите',
//                     pattern: {
//                       value: /^[a-zA-Z0-9]+$/,
//                       message: 'Вы можете использовать только английские буквы и цифры без пробелов и других символов',
//                     },
//                     validate: (tagInputValue) =>
//                       !getValues()
//                         .tagList.map((tagObject) => tagObject.name)
//                         .filter((_, currentChangingTagIndex) => index !== currentChangingTagIndex)
//                         .includes(tagInputValue) || 'Теги должны быть уникальные!',
//                   })}
//                 ></input>
//                 <button type="primary" className={styles.delete} onClick={() => remove(index)}>
//                   Delete
//                 </button>
//               </div>
//             </>
//           ))}
//           <button
//             type="primary"
//             className={styles.add}
//             onClick={() => {
//               append({
//                 name: '',
//               })
//             }}
//           >
//             Add tag
//           </button>
//         </label>
//         <button type="submit" className={styles.send}>
//           Send
//         </button>
//       </form>
//     </div>
//   )
// }
// export default EditPost
