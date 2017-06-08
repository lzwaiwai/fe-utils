const mediaError = (media, callback) => {
  const err = media.error
  const message = err.message
  const nodeName = media.nodeName.toLowerCase()

  let errMsg = ''

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
