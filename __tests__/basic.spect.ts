describe('basic testing', () => {
  it('snapshots an object', () => {
    expect({ state: { id: 23 } }).toMatchSnapshot()
  })
})
