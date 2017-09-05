import { logger } from '../utils/logger'

export const saveToken = (token) => {
  const localStorage = window.localStorage
  try {
    localStorage.setItem('token', JSON.stringify(token))
    logger('localStorage-save-token', 'token save in localStorage succeed')
  } catch (error) {
    logger('localStorage-save-token', error)
  }
}

export const clearToken = () => {
  const localStorage = window.localStorage
  try {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
      logger('localStorage-clear-token', 'token clear')
    }
  } catch (error) {
    logger('localStorage-clear-token', error)
  }
}

export const getToken = () => {
  const localStorage = window.localStorage
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return token;

  } catch (error) {
    logger('localStorage-get-token', error)
    return null;
  }
}
