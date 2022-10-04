/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const setToken = newToken =>{
  if(newToken === ''){
    axios.defaults.headers.common['Authorization'] = '';
  }
  else{
    token = `bearer ${newToken}`
    axios.defaults.headers.common['Authorization'] = token;
  }
  console.log(`NewToken ${token}`)
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const createNew = (blog) =>{
  const request = axios.post(baseUrl, blog)
  return request.then(response => response.data)
}

export default { setToken, getAll, createNew }