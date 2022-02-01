import { Dispatch } from 'redux'

import { ToastData, setToastData } from '../slices/user-macro-actions'

export const setToastDataThunk = (data: ToastData) => (dispatch: Dispatch) => {
  dispatch(setToastData(data))
}
