import blogService from '../services/blogs'
import { useState } from 'react'

const Blog = ({ blog, addLikeHandler, refreshBlogList, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if(!visible){
    return(
      <div style = {blogStyle} id ={blog.title} className='blog'>
        {blog.title} {blog.author} <button onClick={() => setVisible(true)}>View</button>
      </div>
    )
  }
  else return(
    <div style = {blogStyle} id ={blog.title} className='blog'>
      <div>
        {blog.title} <button onClick={() => setVisible(false)}>Hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        Likes <span id='LikesNumber'>{blog.likes}</span> <button onClick={() => {
          addLikeHandler(blog)
          refreshBlogList()
        }}>Like</button>
      </div>
      <div>
        {blog.author}
      </div>
      <RemoveButton
        blog = {blog}
        refreshBlogList = {refreshBlogList}
        user = {user}
      />
    </div>
  )
}
const RemoveButton = ({ blog, refreshBlogList, user }) => {
  if(user && blog.user.username &&  user.username === blog.user.username)
    return(
      <button onClick={() => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
          blogService.removeOne(blog).then(() => refreshBlogList())
        }
      }}>Remove</button>
    )
  else return null
}
export default Blog