import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProjectItem } from '../../../../@types'
import { useSearch, useSortBy } from '../../../../hooks'
import {
  selectSearchValue,
  selectSortBy,
  setDecisionAction
} from '../../../../redux/slices'
import { ProjectItemsRender } from './project-items-render'

type ProjectItemsRenderContainerProps = {
  data: ProjectItem[]
  isLoading: boolean
}

export const ProjectItemsRenderContainer = ({
  data,
  isLoading
}: ProjectItemsRenderContainerProps) => {
  const searchValue = useSelector(selectSearchValue)
  const sortBy = useSelector(selectSortBy)

  const searchedValues = useSearch({ data, searchValue })
  const sortedValues = useSortBy({ data: searchedValues, sortBy })

  const appDispatch = useDispatch()

  const onRenameProjectItem = useCallback(
    (id: string, name: string) => {
      appDispatch(
        setDecisionAction({
          id,
          type: 'project_item.rename',
          defaultValues: {
            name
          }
        })
      )
    },
    [appDispatch]
  )

  const onDeleteProjectItem = useCallback(
    (id: string) => {
      appDispatch(
        setDecisionAction({
          id,
          type: 'project_item.delete'
        })
      )
    },
    [appDispatch]
  )

  const onDuplicateProjectItem = useCallback((name: string) => {
    console.log(name)
  }, [])

  return (
    <ProjectItemsRender
      onDeleteProjectItem={onDeleteProjectItem}
      onRenameProjectITem={onRenameProjectItem}
      onDuplicateProjectItem={onDuplicateProjectItem}
      isLoading={isLoading}
      data={sortedValues}
    />
  )
}
