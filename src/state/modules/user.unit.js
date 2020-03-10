import * as userModule from './user'

describe('@state/modules/user', () => {
  it('exports a valid Vuex module', () => {
    expect(userModule).toBeAVuexModule()
  })
})
