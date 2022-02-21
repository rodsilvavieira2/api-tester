import { Box, SimpleGrid } from '@chakra-ui/react'

import { ProjectItem } from '../../../../@types'
import { CardSkeletonByAmount, ProjectItemCard } from '../../../../components'

type ProjectItemsRenderProps = {
  onDeleteProjectItem: (id: string) => void
  onRenameProjectITem: (id: string, name: string) => void
  onDuplicateProjectItem: (name: string) => void
  projectID: string
  data: ProjectItem[]
  isLoading: boolean
}

export const ProjectItemsRender = ({
  data,
  onDeleteProjectItem,
  onDuplicateProjectItem,
  onRenameProjectITem,
  projectID,
  isLoading
}: ProjectItemsRenderProps) => {
  return (
    <Box w="100%" h="calc(100vh - 9rem)" overflow="auto">
      <SimpleGrid gap="4" w="100%" p="6" minChildWidth="15.375rem">
        {isLoading
          ? (
          <CardSkeletonByAmount amount={10} />
            )
          : (
          <>
            {data.map((item) => (
              <ProjectItemCard
                onDelete={onDeleteProjectItem}
                onRename={onRenameProjectITem}
                onDuplicate={onDuplicateProjectItem}
                projectID={projectID}
                key={item.id}
                {...item}
              />
            ))}
          </>
            )}
      </SimpleGrid>
    </Box>
  )
}
