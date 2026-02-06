const relProtocol = (value: string): string | undefined => {
  if (!value) {
    return
  }
  const match: RegExpMatchArray | null = value.match(/^(?:[^\/]*)\/\/(.+)/)
  const res: string = match ? (`//${match[1]}`) : value
  return res
}

export default relProtocol
