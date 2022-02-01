/* eslint-disable @typescript-eslint/no-empty-function */
import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { SimpleGrid } from '@chakra-ui/react'

import { Project } from '../../../../@types'
import { ProjectCard } from '../../../../components/organisms/cards'
import { useSearch, useSortBy } from '../../../../hooks'
import { selectSearchValue, selectSortBy } from '../../../../redux/slices'

type ProjectsRenderProps = {
  data: Project[]
}

export const ProjectsRender = ({ data }: ProjectsRenderProps) => {
  const onRename = useCallback(() => {}, [])
  const onDelete = useCallback(() => {}, [])

  const searchValue = useSelector(selectSearchValue)
  const sortBy = useSelector(selectSortBy)

  const searchedProjects = useSearch({ data, searchValue })

  const sortedProjects = useSortBy({ data: searchedProjects, sortBy })

  return (
    <SimpleGrid gap="4" w="100%" p="6" minChildWidth="15.375rem">
      {sortedProjects.map((item) => (
        <ProjectCard
          onDelete={onDelete}
          onRename={onRename}
          key={item.id}
          {...item}
        />
      ))}
    </SimpleGrid>
  )
}
