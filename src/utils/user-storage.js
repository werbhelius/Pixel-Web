import { logger } from '../utils/logger'

export const saveUserInfo= (userInfo) => {
  const localStorage = window.localStorage
  try {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
    logger('localStorage-save-userInfo', 'userInfo save in localStorage succeed')
  } catch (error) {
    logger('localStorage-save-userInfo', error)
  }
}

export const clearUserInfo = () => {
  const localStorage = window.localStorage
  try {
    if (!localStorage.getItem('userInfo')) {
      localStorage.removeItem('userInfo');
      logger('localStorage-clear-userInfo', 'userInfo clear')
    }
  } catch (error) {
    logger('localStorage-clear-userInfo', error)
  }
}

export const getUser = () => {
  const localStorage = window.localStorage
  try {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      return null;
    }
    return userInfo;

  } catch (error) {
    logger('localStorage-get-userInfo', error)
    return null;
  }
}
