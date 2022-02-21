import { Dispatch } from 'redux'

import { setToastData } from '../slices/user-macro-actions'
import { ToastData } from '../slices/user-macro-actions/types'

export const setToastDataThunk = (data: ToastData) => (dispatch: Dispatch) => {
  dispatch(setToastData(data))
}
