import { useSelector } from 'react-redux'
import NewFormPost from '../NewFormPost/NewFormPost'
import { useParams } from 'react-router-dom'
import styles from './EditPost.module.scss'

const EditPost = () => {
  const { article } = useSelector((state) => state.posts)
  // const { slug } = useParams()

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
