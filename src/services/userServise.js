// import instance from './baseUrlService'
import axios from 'axios'

const _baseURL = 'https://blog.kata.academy/api'
export const getUserRegistration = async (isValidData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${_baseURL}/users`, isValidData)
    !localStorage.getItem('token') && localStorage.setItem('token', response.data.user.token)

    return response.data
  } catch (error) {
    // if (error.response && error.response.status === 422) {
    console.log(error, 'error')
    return rejectWithValue('ошибка')
  }
}

export const getUserAuth = async (isLoginData, rejectWithValue) => {
  try {
    const response = await axios.post(`${_baseURL}/users/login`, isLoginData)
    !localStorage.getItem('token') && localStorage.setItem('token', response.data.user.token)
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 422) {
      return rejectWithValue('Введены не корректные данные, проверьте их и повторите попытку')
    } else {
      throw error
    }
  }
}

export const updateUserData = async (isLoginData, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
    const response = await axios.put(`${_baseURL}/user`, isLoginData, { headers })

    return response.data
  } catch (error) {
    if (error.response && error.response.status === 422) {
      return rejectWithValue('что-то пошло не так')
    } else {
      throw error
    }
  }
}

export const holdUserAfterUpdate = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await axios.get(`${_baseURL}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (err) {
    return ''
  }
}
