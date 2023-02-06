import styles from './FullPost.module.scss'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchFullArticle, fetchLikeArticle, fetchDeleteOwnArticle, fetchArticles, updatePageAfterDel } from '../../../redux/blogSlice/articlesSlice'
import ReactMarkdown from 'react-markdown'
import { message, Popconfirm } from 'antd'

const FullPost = () => {
  // console.log(props, 'FullPost PROPS')
  const location = useLocation()
  const { slug } = useParams()
  const { username } = useSelector((state) => state.user.user)
  const { isAuth } = useSelector((state) => state.user)
  const { posts } = useSelector((state) => state)

  console.log(posts, 'posts FullPost')
  console.log(isAuth)
  const { author, title, description, createdAt, favoritesCount, tagList, body, favorited } = location.state
  // const { author, title, description, createdAt, favoritesCount, tagList, body, favorited } = useSelector((state) => {
  //   console.log('stateeeee', state)
  //   return state.posts.article
  // })

  // const { author, title, description, createdAt, favoritesCount, tagList, body, favorited } = useSelector((state) => state.posts.article)

  console.log(title)
  // const {
  //   posts: { article },
  // } = useSelector((state) => state.posts.article)

  // const { article } = posts
  // const { title, description, createdAt, favoritesCount, tagList, body, favorited } = article
  console.log(title, 'title')
  // const mapArticles = posts.articles.filter((el) => {

  // } el.slug === slug)
  // const { author, title, description, createdAt, favoritesCount, tagList, body, favorited } = mapArticles
  // console.log(article, 'articlesCount v FullPost')

  const navigate = useNavigate()
  // const { slug } = useParams()
  const dispatch = useDispatch()

  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  useEffect(() => {
    console.log('slug slug', slug)
    if (slug) {
      dispatch(fetchFullArticle(slug))
    }
    if (favorited || !favorited) {
      setLike(favorited)
    }
    setCount(favoritesCount)
  }, [slug, favorited, favoritesCount])

  const confirm = (e) => {
    message.success('Пост удален')
    dispatch(fetchDeleteOwnArticle(slug))
    navigate('/', { replace: true })
  }
  const cancel = (e) => {
    message.error('Отмена удаления поста')
  }

  const hiddenText = description && description.length > 100 ? description.slice(0, description.indexOf('', 70)) + '...' : description

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.postInfo}>
          <div className={styles.postArticle}>
            <span className={styles.title}>{title} </span>
            <button
              className={styles.like}
              onClick={() => {
                setLike(!like)
                setCount(like ? count - 1 : count + 1)
                dispatch(fetchLikeArticle([like, slug]))
              }}
            >
              {like && isAuth ? (
                <HeartFilled style={{ cursor: 'pointer', marginRight: '5px', fontSize: '16px', color: 'red' }} />
              ) : (
                <HeartOutlined
                  style={{
                    cursor: 'pointer',
                    marginRight: '5px',
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, .75)',
                  }}
                />
              )}
            </button>
            <div className={styles.countLike}>{count}</div>
          </div>
          <div className={styles.infoTag}>
            {tagList &&
              tagList.map((el) => (
                <div className={styles.tag} key={el.id}>
                  {el.substr(0, 7)}
                </div>
              ))}
          </div>
          <span className={styles.shortDescription}>{hiddenText}</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userWrapInfo}>
            <div>
              <div className={styles.userName}> {author.username}</div>
              <div className={styles.datePost}> {formatData(createdAt)}</div>
            </div>
            <img className={styles.userAvatar} src={author.image} />
          </div>
          <div className={styles.wrapForBtn}>
            {author.username === username && (
              <>
                <Popconfirm
                  title="Удаление поста"
                  description="Вы уверены, что хотите удалить пост?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Да"
                  cancelText="Нет"
                >
                  <button type="submit" className={styles.deleteBtn}>
                    Delete
                  </button>
                </Popconfirm>
                <Link
                  to={`/articles/${slug}/edit`}
                  className={styles.editBtn}
                  // state={{
                  //   slug: slug,
                  //   author: author,
                  //   title: title,
                  //   description: description,
                  //   createdAt: createdAt,
                  //   favoritesCount: favoritesCount,
                  //   tagList: tagList,
                  //   body: body,
                  // }}
                >
                  Edit
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default FullPost
