import blogService from "../services/blogs"
import { useState } from "react"

const Blog = ({blog, refreshBlogList}) => {
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
      <div style = {blogStyle}>
      {blog.title} {blog.author} <button onClick={()=>setVisible(true)}>View</button>
      </div>  
    )
  }
  else return(
    <div style = {blogStyle}>
      <div>
        {blog.title} <button onClick={()=>setVisible(false)}>Hide</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
        Likes {blog.likes} <button onClick={()=>{
          blogService.addLikes(blog)
          refreshBlogList()
        }}>Like</button>
      </div>
      <div>
        {blog.author} 
      </div>
    </div>  
  )
}

export default Blog