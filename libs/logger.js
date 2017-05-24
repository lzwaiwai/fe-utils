const colors = {
  success: '#5cb85c',
  info: '#5bc0de',
  warn: '#f0ad4e',
  error: '#d9534f'
}

const logger = {
  log (...params) {
    console && console.log(...params)
  },

  success (...params) {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.success };`)
  },

  info (...params) {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.info };`)
  },

  warn (...params) {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.warn };`)
  },

  error (...params) {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.error };`)
  },

  group (groupTip, logs, notCollapsed) {
    if (!groupTip || !logs) {
      return
    }
    const startMessage = notCollapsed
      ? console.group
      : console.groupCollapsed

    try {
      startMessage.call(console, groupTip)
    } catch (e) {
      console.log(groupTip)
    }

    logs()

    try {
      console.groupEnd()
    } catch (e) {
      console.log('—— log end ——')
    }
  }
}

export default logger

