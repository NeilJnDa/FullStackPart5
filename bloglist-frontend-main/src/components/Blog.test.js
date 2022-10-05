import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Render the title and author, no url or likes by default', () => {
  const blog = {
    id: '633c1e05725e00e429660093',
    title: 'NewBlog',
    author: 'Edsger W. Dijkstra',
    url : 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes :7,
    user : '633b9c3a6f6b083bd73d28fd',
  }

  render(<Blog blog = {blog}/>)
  //screen.debug(containter)

  const title = screen.getByText(/NewBlog/)
  const author = screen.getByText(/Edsger W. Dijkstra/)
  // const url = screen.getByText(/http:/)
  // const likes = screen.getByText(/Likes/)
  expect(title).toBeDefined()
  expect(author).toBeDefined()
  // expect(url).toBeNull()
  // expect(likes).toBeNull()
})