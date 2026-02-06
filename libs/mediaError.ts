interface MediaErrorResult {
  code: number
  msg: string
}

const mediaError = (media: HTMLMediaElement, callback?: (result: MediaErrorResult) => void): void => {
  const err: MediaError | null = media.error
  if (!err) {
    return
  }
  
  const message: string = err.message
  const nodeName: string = media.nodeName.toLowerCase()

  let errMsg: string = ''

  try {
    switch (err.code) {
      case MediaError.MEDIA_ERR_ABORTED:
        errMsg += `The user canceled the ${nodeName}. `
        break
      case MediaError.MEDIA_ERR_NETWORK:
        errMsg += `A network error occurred while fetching the ${nodeName}. `
        break
      case MediaError.MEDIA_ERR_DECODE:
        errMsg += `An error occurred while decoding the ${nodeName}. `
        break
      case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
        errMsg += `The ${nodeName} is missing or is in a format not supported by your browser. `
        break
      default:
        errMsg += 'An unknown error occurred. '
        break
    }
  } catch (err) {
    console && console.log(err)
  }

  if (message && message.length) {
    errMsg += message
  }

  callback && callback({
    code: err.code,
    msg: errMsg
  })
}

export default mediaError
