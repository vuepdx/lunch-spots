import searchForm from './SearchForm'

let wrapper = null
beforeEach(() => {
  wrapper = mount(searchForm, {
    ...createComponentMocks({
      store: {
        user: require('@state/modules/user'),
        search: require('@state/modules/search'),
      },
    }),
  })
})

enableAutoDestroy(afterEach)

describe('@components/searchForm', () => {
  it('exports a valid component', () => {
    expect(searchForm).toBeAComponent()
  })
  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
