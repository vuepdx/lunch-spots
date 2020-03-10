import searchForm from './SearchForm'

describe('@components/searchForm', () => {
  const wrapper = shallowMount(
    searchForm,
    createComponentMocks({
      store: {
        user: {
          state: {
            location: {},
          },
          getters: {
            specificLocation: (state) => state.location,
          },
        },
        search: {
          state: {
            loading: false,
            spots: [],
            form: {},
          },
          getters: {
            loading: (state) => state.loading,
            spots: (state) => state.spots,
            form: (state) => state.form,
          },
        },
      },
    })
  )
  it('exports a valid component', () => {
    expect(searchForm).toBeAComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
