import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
  id: '633c1e05725e00e429660093',
  title: 'NewBlog',
  author: 'Edsger W. Dijkstra',
  url : 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes :7,
  user : '633b9c3a6f6b083bd73d28fd',
}
test('Render the title and author, no url or likes by default', () => {
  render(<Blog blog = {blog}/>)
  const title = screen.getByText(/NewBlog/)
  const author = screen.getByText(/Edsger W. Dijkstra/)
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})
test('Check that the blog\'s url and number of likes are shown when the button is clicked ', async () => {
  render(<Blog blog = {blog}/>)
  const user = userEvent.setup()
  const button = screen.getByText(/View/)
  await user.click(button)

  const url = screen.getByText(/http:/)
  const likes = screen.getByText(/Likes/)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})
test('Ensure that if the like button is clicked twice, the event handler the component received as props is called twice. ', async () => {
  const mockHandler  = jest.fn()
  const mockHandler2  = jest.fn()
  render(<Blog blog = {blog} addLikeHandler = {mockHandler} refreshBlogList = {mockHandler2}/>)
  const user = userEvent.setup()
  const button = screen.getByText(/View/)
  await user.click(button)
  const like = screen.getByRole('button', { name: 'Like' })
  await user.click(like)
  await user.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
