import { useState } from 'react'
const NewBlogForm = ({ createNewBlog }) => {
  //Create new
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreateNew = (event) => {
    event.preventDefault()
    createNewBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }
  return(
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreateNew}>
        <div>
                Title:
          <input
            name = "Title"
            type="text"
            value={newTitle}
            onChange = {({ target }) => setNewTitle(target.value)}
            placeholder = 'Blog Title'
          />
        </div>
        <div>
                Author:
          <input
            name = "Author"
            type="text"
            value={newAuthor}
            onChange = {({ target }) => setNewAuthor(target.value)}
            placeholder = 'Name'

          />
        </div>
        <div>
                Url:
          <input
            name = "Url"
            type="text"
            value={newUrl}
            onChange = {({ target }) => setNewUrl(target.value)}
            placeholder = 'http://....'
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
export default NewBlogForm