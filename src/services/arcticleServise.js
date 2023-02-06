import axios from 'axios'
import instance from './baseUrlService'

export const getArticlesList = async (offset = 0) => {
  const token = localStorage.getItem('token')
  const response = await instance.get('articles', {
    params: {
      limit: 5,
      offset,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.statusText !== '') {
    throw new Error('ошибка обработки данных')
  }
  return response.data
}

export const getFullArticle = async (slug) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.get(`articles/${slug}`, { headers })
  if (response.statusText !== '') {
    throw new Error('ошибка обработки данных')
  }

  return response.data
}

export const getNewArticle = async (isValidData) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.post('/articles', isValidData, { headers })
  if (response.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
  return response.data
}

export const deleteOwnArticle = async (slug) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.delete(`/articles/${slug}`, { headers })
  if (response.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
}

export const editOwnArticle = async (slugData) => {
  const { slug } = slugData
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, slugData.validData, { headers })
  if (response.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
  return response.data
}

export const getLikeArticle = async (slug) => {
  const token = localStorage.getItem('token')
  const response = await axios({
    method: !slug[0] ? 'POST' : 'DELETE',
    url: `https://blog.kata.academy/api/articles/${slug[1]}/favorite`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  return response
}
