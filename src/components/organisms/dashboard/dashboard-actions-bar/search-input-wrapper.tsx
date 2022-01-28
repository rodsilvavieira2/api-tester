import { useDispatch, useSelector } from 'react-redux'

import { selectSearchValue, setSearchValue } from '../../../../redux/slices'
import { SearchInput } from '../../../molecules'

export const SearchInputWrapper = () => {
  const appDispatch = useDispatch()

  const searchValue = useSelector(selectSearchValue)

  return (
    <SearchInput
      value={searchValue}
      onChange={(e) => appDispatch(setSearchValue(e.currentTarget.value))}
    />
  )
}
