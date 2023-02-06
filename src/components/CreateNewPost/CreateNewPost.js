import { useSelector } from 'react-redux'
import NewFormArticle from '../modalWindows/NewFormPost/NewFormPost'
import { useParams } from 'react-router-dom'
import styles from './CreateNewPost.module.scss'

const CreateNewPost = () => {
  return (
    <div className={styles.containerNewPost}>
      <NewFormArticle>
        title={'Create new article'}
        titleArticle={undefined}
        description={undefined}
        body={undefined}
        tagList={undefined}
        slug={undefined}
      </NewFormArticle>
    </div>
  )
}
export default CreateNewPost
