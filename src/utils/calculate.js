export const getMiles = (int) => {
  if (!int) return 0
  return int * 0.000621371192
}

export const getMeters = (int) => {
  if (!int) return 0
  return int * 1609.344
}
