import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import NewBlogForm from './services/NewBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorFlag, setErrorFlag] = useState(false)

  //Create new
  const [newBlogVisible, setNewBlogVisible] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  // Use local token to log in
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
  //Pop up messages, a wrapper for notification
  function popMessage(message, duration, isError=false){
    setMessage(message);
    setErrorFlag(isError);
    setTimeout(() => {
      setMessage('');
      setErrorFlag(false);
    }, duration * 1000);
  }
  //Get request: Blogs
  async function refreshBlogList(){
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }
  //Login
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      console.log('logged in with', username, password)
      popMessage("Logged in with", 3)
      const user = await loginService.login({username, password})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUserBlogList', JSON.stringify(user));
      setUser(user)
      setUsername('')
      setPassword('')
      await refreshBlogList()
    }
    catch(exception){
      popMessage(`Wrong username or password`, 3,true)
      console.log(exception.name);
    }
  }
  //Logout
  const handleLogout = (event) =>{
    event.preventDefault();
    popMessage("Logged out", 3)

    blogService.setToken(null);
    window.localStorage.removeItem('loggedUserBlogList');
    setUser(null);
    setBlogs([])
  }
  //New blog
  const handleCreateNew = async (event) =>{
    event.preventDefault();
    popMessage(`New blog created: ${newTitle} by ${newAuthor}`, 3)
    console.log(event)
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const createdBlog = await blogService.createNew(blog)
    await refreshBlogList()
    console.log(createdBlog)
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
        <NewBlogForm
          newBlogVisible = {newBlogVisible}
          setNewBlogVisible = {setNewBlogVisible}
          newTitle = {newTitle}
          newAuthor = {newAuthor}
          newUrl = {newUrl}
          setNewTitle = {setNewTitle}
          setNewAuthor = {setNewAuthor}
          setNewUrl = {setNewUrl}
          handleCreateNew = {handleCreateNew}
        />
        <h2>List</h2>
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
