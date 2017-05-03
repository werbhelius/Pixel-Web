export const saveToken = (token) => {
  try {
    localStorage.setItem('token', token)
  } catch (error) { }
}

export const clearToken = () => {
  try {
    if (!localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  } catch (error) { }
}

export const getToken = () => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return token;

  } catch (error) {
    return null;
  }
}
