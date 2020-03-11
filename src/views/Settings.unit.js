import settings from './Settings'

describe('@views/Settings', () => {
  const wrapper = mount(settings, createComponentMocks())
  it('is a valid view', () => {
    expect(settings).toBeAComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
