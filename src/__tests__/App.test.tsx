import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import App from '../App'

test('renders NewsOrbit header', () => {
  render(<App />)
  const header = screen.getByText(/NewsOrbit/i)
  expect(header).toBeInTheDocument()
})

test('renders welcome message', () => {
  render(<App />)
  const welcome = screen.getByText(/Welcome to NewsOrbit/i)
  expect(welcome).toBeInTheDocument()
})

test('renders featured news section', () => {
  render(<App />)
  const featured = screen.getByText(/Featured News/i)
  expect(featured).toBeInTheDocument()
})