import { render, screen } from '@testing-library/react'
import App from 'app'
import { describe, expect, it } from 'vitest'

describe('GIVEN App', () => {
  it('should render the title', () => {
    render(<App />)

    expect(screen.getByText(/react/i)).toMatchSnapshot()
  })

  it('should render the author', () => {
    render(<App />)

    expect(screen.getByText(/yony calsin/i)).toMatchSnapshot()
  })
})
