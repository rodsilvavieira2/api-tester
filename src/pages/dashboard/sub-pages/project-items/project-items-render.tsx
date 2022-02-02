import { useSelector } from 'react-redux'

import { Box, SimpleGrid } from '@chakra-ui/react'

import { ProjectItem } from '../../../../@types'
import { ProjectCard } from '../../../../components/organisms/cards'
import { useSearch, useSortBy } from '../../../../hooks'
import { selectSearchValue, selectSortBy } from '../../../../redux/slices'

type ProjectItemsRenderProps = {
  data: ProjectItem[]
}

export const ProjectItemsRender = ({ data }:ProjectItemsRenderProps) => {
  const searchValue = useSelector(selectSearchValue)
  const sortBy = useSelector(selectSortBy)

  const searchedValues = useSearch({ data, searchValue })
  const sortedValues = useSortBy({ data: searchedValues, sortBy })

  return (
    <Box w="100%" h="calc(100vh - 9rem)" overflow="auto">
      <SimpleGrid gap="4" w="100%" p="6" minChildWidth="15.375rem">
        {sortedValues.map((item) => (
          <ProjectCard key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
