import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArticlesList, getFullArticle, getNewArticle, deleteOwnArticle, editOwnArticle, getLikeArticle } from '../../services/arcticleServise'

export const fetchArticles = createAsyncThunk('/articles/fetchArticles', async (offset) => {
  return await getArticlesList(offset)
})

export const fetchFullArticle = createAsyncThunk('/articles/fetchFullArticle', async (slug) => {
  return await getFullArticle(slug)
})

export const fetchGetNewArticle = createAsyncThunk('/articles/fetchGetNewArticle', async (isValidData) => {
  return await getNewArticle(isValidData)
})

export const fetchDeleteOwnArticle = createAsyncThunk('/articles/fetchDeleteOwnArticle', async (slug) => {
  return await deleteOwnArticle(slug)
})

export const fetchEditOwnArticle = createAsyncThunk('/articles/fetchEditOwnArticle', async (slugData) => {
  return await editOwnArticle(slugData)
})

export const fetchLikeArticle = createAsyncThunk('articles/fetchLikeArticle', async (slug, { rejectWithValue }) => {
  return getLikeArticle(slug, rejectWithValue)
})

const initialState = {
  posts: [],
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
  articlesCount: 0,
  status: null,
  error: null,
  offset: 0,
  currentPage: 1,
  newPost: [],
  sendPost: false,
  deletePost: false,
  editPost: false,
  currentArticle: null,
  favorited: false,
  likeCount: 0,
  like: false,
}

const getpostSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {
    updateOffset: (state, { payload }) => {
      state.offset = payload
    },
    updatePage: (state, { payload }) => {
      state.currentPage = payload
    },
    updatePageAfterDel: (state) => {
      state.deletePost = false
    },
    toggleLike: (state) => {
      state.like = !state.like
      state.count = state.like ? state.count + 1 : state.count - 1
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
    },
    [fetchArticles.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.posts = payload
      state.articlesCount = payload
      state.sendPost = false
      state.editPost = false
    },
    [fetchArticles.rejected]: (state, { payload }) => {
      state.status = 'Error'
      state.error = payload
    },
    [fetchFullArticle.pending]: (state, action) => {
      console.log('action', action)
      state.status = 'Loading'
      state.error = null
    },
    [fetchFullArticle.fulfilled]: (state, { payload }) => {
      console.log('fetchFullArticle payload', payload)
      state.status = 'Resolved'
      state.article = payload?.article
    },
    [fetchGetNewArticle.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
      state.sendPost = false
    },
    [fetchGetNewArticle.fulfilled]: (state, { payload }) => {
      state.status = 'Resolved'
      state.error = payload
      state.sendPost = true
    },
    [fetchGetNewArticle.rejected]: (state, { payload }) => {
      state.status = 'Rejected'
      state.error = payload
    },
    [fetchDeleteOwnArticle.pending]: (state) => {
      state.status = 'Loading'
      state.error = null
      state.deletePost = false
    },
    [fetchDeleteOwnArticle.fulfilled]: (state) => {
      state.status = 'Resolved'
      state.deletePost = true
    },
    [fetchDeleteOwnArticle.rejected]: (state, { payload }) => {
      state.status = 'Error'
      state.error = payload
    },
    [fetchLikeArticle.pending]: (state) => {
      state.status = true
      state.error = null
    },
    [fetchLikeArticle.fulfilled]: (state, { payload }) => {
      state.status = false
      state.posts.articles.map((article) => {
        if (article.slug === payload.article.slug) article = payload.article
        return article
      })
    },

    [fetchEditOwnArticle.pending]: (state) => {
      state.status = 'Loading'
      state.editPost = false
    },
    [fetchEditOwnArticle.fulfilled]: (state) => {
      state.status = false
      state.editPost = true
      // state.article = payload.article
      // state.posts.article = payload
    },
    [fetchEditOwnArticle.rejected]: (state, action) => {
      state.status = 'Error'
      // state.error = action.payload
    },
  },
})
export const { updateOffset, updatePage, updatePageAfterDel, toggleLike, updateSendPost } = getpostSlice.actions

export default getpostSlice.reducer
