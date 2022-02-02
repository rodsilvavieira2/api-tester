import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Project } from '../../../../@types'
import { useSearch, useSortBy } from '../../../../hooks'
import {
  selectSearchValue,
  selectSortBy,
  setAlertData,
  setDecisionAction
} from '../../../../redux/slices'
import { ProjectsRender } from './projects-render'

type ProjectRenderContainerProps = {
  isLoading: boolean
  data: Project[]
}

export const ProjectRenderContainer = ({
  data,
  isLoading
}: ProjectRenderContainerProps) => {
  const searchValue = useSelector(selectSearchValue)
  const sortBy = useSelector(selectSortBy)

  const searchedValues = useSearch({ data, searchValue })
  const sortedValues = useSortBy({ data: searchedValues, sortBy })

  const appDispatch = useDispatch()

  const onRenameProject = useCallback(
    (id: string, name: string) => {
      appDispatch(
        setDecisionAction({
          id,
          type: 'project.rename',
          defaultValues: {
            name
          }
        })
      )
    },
    [appDispatch]
  )

  const onDeleteProject = useCallback(
    (id: string) => {
      appDispatch(
        setAlertData({
          id,
          type: 'project.delete'
        })
      )
    },
    [appDispatch]
  )

  return (
    <ProjectsRender
      onDeleteProject={onDeleteProject}
      onRenameProject={onRenameProject}
      data={sortedValues}
      isLoading={isLoading}
    />
  )
}
