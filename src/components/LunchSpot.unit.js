// import lunchSpotExample from 'support/lunchSpot'
import yelpExample from 'support/yelpExample'
import lunchSpot from './LunchSpot'

describe('@components/lunchSpot', () => {
  const wrapper = shallowMount(lunchSpot, {
    ...createComponentMocks(),
    propsData: {
      spot: yelpExample,
    },
  })
  it('exports a valid component', () => {
    expect(lunchSpot).toBeAComponent()
    expect(wrapper).toMatchSnapshot()
  })
})
