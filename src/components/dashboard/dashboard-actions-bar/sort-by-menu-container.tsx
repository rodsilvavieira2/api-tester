import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectSortBy, setSortBy } from '../../../redux/slices'
import { SortBy } from '../../../redux/slices/user-macro-actions/types'
import { SortByMenu } from './sort-by-menu'

export const SortByMenuContainer = () => {
  const sortBy = useSelector(selectSortBy)
  const appDispatch = useDispatch()

  const onChange = useCallback((value: SortBy) => {
    appDispatch(setSortBy(value))
  }, [appDispatch])

  return (
    <SortByMenu onChange={onChange} defaultValue={sortBy}/>
  )
}
