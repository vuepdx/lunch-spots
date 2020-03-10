import * as searchModule from './search'

describe('@state/modules/search', () => {
  it('exports a valid Vuex module', () => {
    expect(searchModule).toBeAVuexModule()
  })
})
