const relProtocol = (value: string): string | undefined => {
  if (!value) {
    return
  }
  const matchResult: RegExpMatchArray | null = value.match(/^(?:[^\/]*)\/\/(.+)/)
  const res: string = matchResult ? (`//${matchResult[1]}`) : value
  return res
}

export default relProtocol
