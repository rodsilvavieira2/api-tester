import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SortBy } from '../../../@types'
import { selectSortBy, setSortBy } from '../../../redux/slices'
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
