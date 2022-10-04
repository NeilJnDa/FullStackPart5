import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedUserBlogList')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)

      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      })
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log('logging in with', username, password)
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUserBlogList', JSON.stringify(user));
      setUser(user)
      setUsername('')
      setPassword('')
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    catch(exception){
      setMessage(`Wrong credentials ${exception.name}`);
      setErrorFlag(true);
      setTimeout(() => {
        setMessage('');
        setErrorFlag(false);
      }, 3000);
    }
  }
  const handleLogout = (event) =>{
    event.preventDefault();
    blogService.setToken(null);
    window.localStorage.removeItem('loggedUserBlogList');
    setUser(null);
    setBlogs([])
  }
  const handleCreateNew = async (event) =>{
    event.preventDefault();
    console.log(event)
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const createdBlog = await blogService.createNew(blog)
    console.log(createdBlog)
  }
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
              name = "Username"
              type="text"
              value={username}
              onChange = {({target}) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input 
              name = "Password"
              type="text"
              value={password}
              onChange = {({target}) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  else{
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        <form onSubmit={handleCreateNew}>
          <div>
            Title:
            <input
              name = "Title"
              type="text"
              value={newTitle}
              onChange = {({target}) => setNewTitle(target.value)}
            />
          </div>
          <div>
            Author:
            <input
              name = "Author"
              type="text"
              value={newAuthor}
              onChange = {({target}) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            Url:
            <input
              name = "Url"
              type="text"
              value={newUrl}
              onChange = {({target}) => setNewUrl(target.value)}
            />
          </div>
            <button type="submit">Create</button>
        </form>
        <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </div>
      </div>
    )
  }

}

export default App
