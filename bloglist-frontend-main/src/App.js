import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggle from './components/Toggle'

import './index.css'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)

  const createToggleRef = useRef()

  // Use local token to log in
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUserBlogList')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => {
        setBlogs(blogs)
      })
    }
  }, [])
  //Pop up messages, a wrapper for notification
  function popMessage(message, duration, isError=false){
    setMessage(message)
    setErrorFlag(isError)
    setTimeout(() => {
      setMessage('')
      setErrorFlag(false)
    }, duration * 1000)
  }
  //Login
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username, password })
      console.log('logged in with', username, password)
      popMessage(`Logged in with ${username}`, 3)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUserBlogList', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      await refreshBlogList()
    }
    catch(exception){
      popMessage('Wrong username or password', 20,true)
      console.log(exception.name)
    }
  }
  //Logout
  const handleLogout = (event) => {
    event.preventDefault()
    popMessage('Logged out', 3)

    blogService.setToken(null)
    window.localStorage.removeItem('loggedUserBlogList')
    setUser(null)
    setBlogs([])
  }
  //New blog
  const createNewBlog = async (newBlog) => {
    try{
      popMessage(`New blog created: ${newBlog.title} by ${newBlog.author}`, 3)
      const createdBlog = await blogService.createNew(newBlog)
      await refreshBlogList()
      createToggleRef.current.toggleVisibility()
      console.log(createdBlog)
    }
    catch(exception){
      popMessage(`Create blog Error: ${exception.name}`, 3, true)
      console.error(exception)
    }
  }
  //Get request: Blogs
  async function refreshBlogList(){
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  //JSX returned by react
  //Log in page
  if(user === null){
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification
          message={message}
          errorFlag={errorFlag}
        />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id = 'username'
              name = "Username"
              type="text"
              value={username}
              onChange = {({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id = 'password'
              name = "Password"
              type="text"
              value={password}
              onChange = {({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-submit' type="submit">login</button>
        </form>
      </div>
    )
  }
  //Blog page
  else{
    return (
      <div>
        <h2>Blogs</h2>
        <Notification
          message={message}
          errorFlag={errorFlag}
        />
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        <Toggle buttonLabel = 'Create New' ref = {createToggleRef}>
          <NewBlogForm
            createNewBlog={createNewBlog}
          />
        </Toggle>
        <h2>List</h2>
        <div>
          {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} addLikeHandler = {blogService.addLikes} refreshBlogList = {refreshBlogList} user={user} />
          )}
        </div>
      </div>
    )
  }
}

export default App
