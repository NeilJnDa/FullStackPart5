import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = newToken => {
  if(newToken === ''){
    axios.defaults.headers.common['Authorization'] = ''
  }
  else{
    token = `bearer ${newToken}`
    axios.defaults.headers.common['Authorization'] = token
  }
  //console.log(`NewToken ${token}`)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createNew = (blog) => {
  const request = axios.post(baseUrl, blog)
  return request.then(response => response.data)
}
const addLikes = (blog) => {
  const fieldToChange = {
    likes : blog.likes + 1
  }
  const request = axios.put(`${baseUrl}/${blog.id}`, fieldToChange)
  return request.then(response => response.data)
}
const removeOne = (blog) => {
  const request = axios.delete(`${baseUrl}/${blog.id}`)
  return request.then(response => response.data)

}

export default { setToken, getAll, createNew, addLikes, removeOne }