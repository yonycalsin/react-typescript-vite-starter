import { describe, expect, it } from 'vitest'

describe('basic', () => {
  it('multiplication', () => {
    expect(5 * 5).toMatchSnapshot()

    expect(5 * 5).toStrictEqual(25)
  })
})
