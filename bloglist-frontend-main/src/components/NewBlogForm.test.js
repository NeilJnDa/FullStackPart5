import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'


const newBlog = {
  title: 'NewBlog',
  author: 'Edsger W. Dijkstra',
  url : 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
}
test('Test the form of creating a new blog ', async () => {
  const mockHandler  = jest.fn()
  render(<NewBlogForm createNewBlog={mockHandler}/>)
  const user = userEvent.setup()
  const titleInput = screen.getByPlaceholderText(/Blog Title/)
  const authorInput = screen.getByPlaceholderText(/Name/)
  const urlInput = screen.getByPlaceholderText(/http/)

  await user.type(titleInput,newBlog.title)
  await user.type(authorInput,newBlog.author)
  await user.type(urlInput,newBlog.url)

  const button = screen.getByRole('button', { name: 'Create' })
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(newBlog.title)
  expect(mockHandler.mock.calls[0][0].author).toBe(newBlog.author)
  expect(mockHandler.mock.calls[0][0].url).toBe(newBlog.url)

})