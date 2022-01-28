import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  SimpleGrid,
  Skeleton,
  useToast,
  useUpdateEffect
} from '@chakra-ui/react'

import { ProjectItemCard } from '../../../../components/organisms/cards'
import { useSearch, useSortBy } from '../../../../hooks'
import {
  selectAllProjectItems,
  useDeleteProjectItemMutation,
  useGetProjectItemsQuery
} from '../../../../redux/apis'
import {
  selectSearchValue,
  selectCurrentProject,
  setDuplicateProjectItemInfo,
  setRenameProjectItemInfo,
  selectSortBy
} from '../../../../redux/slices'

export function Projects () {
  const currentProject = useSelector(selectCurrentProject)
  const sortBy = useSelector(selectSortBy)
  const searchValue = useSelector(selectSearchValue)

  const [isGettingProjectData, setIsGettingProjectData] = useState(false)

  const { items, isLoading, isFetching } = useGetProjectItemsQuery(
    {
      projectName: currentProject
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

  const appDispatch = useDispatch()

  const toast = useToast()

  const [deleteProjectItem] = useDeleteProjectItemMutation()

  useUpdateEffect(() => {
    setIsGettingProjectData(true)
  }, [currentProject])

  useUpdateEffect(() => {
    if (isGettingProjectData && !isFetching) {
      setIsGettingProjectData(false)
    }
  }, [isGettingProjectData, isFetching])

  const searchedItems = useSearch({ data: items, searchValue })
  const sortedItems = useSortBy({ data: searchedItems, sortBy })

  const onDuplicate = useCallback(
    (name: string) => {
      appDispatch(
        setDuplicateProjectItemInfo({
          currentProjectItemName: name,
          isOpen: true
        })
      )
    },
    [appDispatch]
  )

  const onRename = useCallback(
    (id: string, name: string) => {
      appDispatch(
        setRenameProjectItemInfo({
          id,
          currentProjectItemName: name,
          isOpen: true
        })
      )
    },
    [appDispatch]
  )

  const onDelete = useCallback(
    async (id: string) => {
      try {
        const toastID = toast({
          title: 'Deletar item de projeto',
          description: 'Processando...',
          isClosable: false,
          duration: null,
          status: 'info',
          variant: 'left-accent'
        })

        await deleteProjectItem({ id }).unwrap()

        if (toastID) toast.close(toastID)

        toast({
          title: 'Deletar item de projeto',
          description: 'Item de projeto deletado',
          isClosable: true,
          status: 'success',
          variant: 'left-accent'
        })
      } catch {
        toast({
          title: 'Deletar item de projeto',
          description: 'Algo inesperado aconteceu',
          isClosable: true,
          status: 'error',
          variant: 'left-accent'
        })
      }
    },
    [deleteProjectItem, toast]
  )

  return (
    <>
      <SimpleGrid minChildWidth="210px" spacing="5">
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
