import { getMiles, getMeters } from './calculate'

describe('@utils/calculate.getMiles', () => {
  it('converts a mile to meters', () => {
    const result = getMiles(1)
    expect(result).toEqual(0.000621371192)
  })
  it('return 0 if no param passed', () => {
    const result = getMiles()
    expect(result).toEqual(0)
  })
})
describe('@utils/calculate.getMeters', () => {
  it('converts a mile to meters', () => {
    const result = getMeters(1)
    expect(result).toEqual(1609.344)
  })
  it('return 0 if no param passed', () => {
    const result = getMeters()
    expect(result).toEqual(0)
  })
})
