/* eslint-disable @typescript-eslint/no-empty-function */
import { useState } from 'react'
import { useSelector } from 'react-redux'

import {
  SimpleGrid,
  Skeleton,
  useUpdateEffect
} from '@chakra-ui/react'

import { ProjectItemCard } from '../../../../components/organisms/cards'
import { useSearch, useSortBy } from '../../../../hooks'
import {
  selectAllProjectItems,
  useGetProjectItemsQuery
} from '../../../../redux/apis'
import {
  selectSearchValue,
  selectCurrentProjectID,
  selectSortBy
} from '../../../../redux/slices'

export function Projects () {
  const currentProjectID = useSelector(selectCurrentProjectID)
  const sortBy = useSelector(selectSortBy)
  const searchValue = useSelector(selectSearchValue)

  const [isGettingProjectData, setIsGettingProjectData] = useState(false)

  const { items, isLoading, isFetching } = useGetProjectItemsQuery(
    {
      id: currentProjectID
    },
    {
      selectFromResult: ({ data = { entities: {}, ids: [] }, ...rest }) => {
        return {
          ...rest,
          items: selectAllProjectItems(data)
        }
      }
    }
  )

  useUpdateEffect(() => {
    setIsGettingProjectData(true)
  }, [currentProjectID])

  useUpdateEffect(() => {
    if (isGettingProjectData && !isFetching) {
      setIsGettingProjectData(false)
    }
  }, [isGettingProjectData, isFetching])

  const searchedItems = useSearch({ data: items, searchValue })
  const sortedItems = useSortBy({ data: searchedItems, sortBy })

  const onDuplicate = () => {}

  const onRename = () => {}
  const onDelete = () => {}

  return (
    <>
      <SimpleGrid minChildWidth="210px" spacing="5" p="8">
        {isLoading || isGettingProjectData
          ? (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                minH="250px"
                w="100%"
                border="base"
                boxShadow="base"
              />
            ))}
          </>
            )
          : (
          <>
            {sortedItems?.map((item) => (
              <ProjectItemCard
                {...item}
                key={item.id}
                onDelete={onDelete}
                onRename={onRename}
                onDuplicate={onDuplicate}
              />
            ))}
          </>
            )}
      </SimpleGrid>
    </>
  )
}
