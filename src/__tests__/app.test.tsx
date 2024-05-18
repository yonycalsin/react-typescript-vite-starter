import { render, screen } from '@testing-library/react'
import App from 'app'
import { describe, expect, it } from 'vitest'

describe('GIVEN App', () => {
  it('should render the title', () => {
    render(<App />)

    const title = screen.queryByText(/react/i)

    expect(title).toBeInTheDocument()

    expect(title).toMatchSnapshot()
  })

  it('should render the author', () => {
    render(<App />)

    expect(screen.getByText(/yony calsin/i)).toMatchSnapshot()
  })
})
