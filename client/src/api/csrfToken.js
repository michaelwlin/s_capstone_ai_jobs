export const getCSRFToken = () => {
  const csrfCookie = document.cookie.match(/csrftoken=([^ ;]+)/)
  return csrfCookie ? csrfCookie[1] : null
}