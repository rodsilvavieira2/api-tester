import { useSelector } from 'react-redux'

import { Box, SimpleGrid } from '@chakra-ui/react'

import { Project } from '../../../../@types'
import { ProjectCard } from '../../../../components/organisms/cards'
import { useSearch, useSortBy } from '../../../../hooks'
import { selectSearchValue, selectSortBy } from '../../../../redux/slices'

type ProjectsRenderProps = {
  data: Project[]
}

export const ProjectsRender = ({ data }: ProjectsRenderProps) => {
  const searchValue = useSelector(selectSearchValue)
  const sortBy = useSelector(selectSortBy)

  const searchedProjects = useSearch({ data, searchValue })

  const sortedProjects = useSortBy({ data: searchedProjects, sortBy })

  return (
    <Box w="100%" h="calc(100vh - 9rem)" overflow="auto">
      <SimpleGrid gap="4" w="100%" p="6" minChildWidth="15.375rem">
        {sortedProjects.map((item) => (
          <ProjectCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
