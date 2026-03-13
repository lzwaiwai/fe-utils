interface Colors {
  success: string
  info: string
  warn: string
  error: string
}

const colors: Colors = {
  success: '#5cb85c',
  info: '#5bc0de',
  warn: '#f0ad4e',
  error: '#d9534f'
}

interface Logger {
  log(...params: any[]): void
  success(...params: any[]): void
  info(...params: any[]): void
  warn(...params: any[]): void
  error(...params: any[]): void
  group(groupTip: string, logs: () => void, notCollapsed?: boolean): void
}

const logger: Logger = {
  log(...params: any[]): void {
    console && console.log(...params)
  },

  success(...params: any[]): void {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.success };`)
  },

  info(...params: any[]): void {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.info };`)
  },

  warn(...params: any[]): void {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.warn };`)
  },

  error(...params: any[]): void {
    console && console.log(`%c${params.join(' ')}`, `color: ${ colors.error };`)
  },

  group(groupTip: string, logs: () => void, notCollapsed?: boolean): void {
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
