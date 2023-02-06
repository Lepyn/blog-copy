import styles from './PostList.module.scss'
import PostItem from '../PostItem/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchArticles, updateOffset, updatePage } from '../../redux/blogSlice/articlesSlice'
import { LoadingOutlined } from '@ant-design/icons'
import { Pagination, Spin } from 'antd'

const PostList = () => {
  const dispatch = useDispatch()
  const {
    offset,
    status,
    currentPage,
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const handlePagination = (number) => {
    dispatch(updateOffset((number - 1) * 5))
    dispatch(updatePage(number))
  }

  useEffect(() => {
    dispatch(fetchArticles(offset))
  }, [dispatch, offset])

  const antIcon = <LoadingOutlined spin />

  return (
    <>
      {status === 'Loading' && <Spin indicator={antIcon} className={styles.spin} />}
      {status === 'Error' && (
        <div className={styles.error}>
          <span className={styles.errorText}> Ошибка: что-то пошло не так!</span>
        </div>
      )}
      <ul className={styles.wrapperPostList}>
        {articles?.map((article) => (
          <PostItem key={article.slug} article={article} />
        ))}
      </ul>
      <div className={styles.pagination}>
        <Pagination current={currentPage} onChange={(e) => handlePagination(e)} defaultCurrent={1} total={articlesCount} />
      </div>
    </>
  )
}
export default PostList
