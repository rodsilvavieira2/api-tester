import { CustomError } from '../@types'

export function isCustomError<T = unknown> (error: any): error is CustomError<T> {
  const hashData = Object.prototype.hasOwnProperty.bind(error, 'data')()

  if (hashData) {
    const hasCode = Object.prototype.hasOwnProperty.bind(error.data, 'code')()
    const hasMessage = Object.prototype.hasOwnProperty.bind(
      error.data,
      'message'
    )()

    return hasCode && hasMessage
  }

  return false
}
