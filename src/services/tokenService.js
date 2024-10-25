// Setters
export const setAccessToken = (token) =>
  localStorage.setItem('access_token', token);

export const setRefreshToken = (token) =>
  localStorage.setItem('refresh_token', token);

export const removeRefreshToken = () =>
  localStorage.removeItem('refresh_token');

export const removeAccessToken = () => localStorage.removeItem('access_token');

// Getters
export const getAccessToken = () => localStorage.getItem('access_token');
export const getRefreshToken = () => localStorage.getItem('refresh_token');
