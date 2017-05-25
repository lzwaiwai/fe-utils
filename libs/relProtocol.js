const relProtocol = (value) => {
  if (!value) {
    return
  }
  let res = value.match(/^(?:[^\/]*)\/\/(.+)/)
  res = res ? (`//${res[1]}`) : value
  return res
}

export default relProtocol
