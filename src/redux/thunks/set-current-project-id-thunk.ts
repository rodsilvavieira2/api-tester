import { Dispatch } from 'redux'

import { setCurrentProjectID } from '../slices'

export const setCurrentProjectIDThunk = (id: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setCurrentProjectID(id))
  }
}
