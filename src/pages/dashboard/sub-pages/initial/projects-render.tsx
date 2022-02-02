
import { Box, SimpleGrid } from '@chakra-ui/react'

import { Project } from '../../../../@types'
import { CardSkeletonByAmount } from '../../../../components'
import { ProjectCard } from '../../../../components/cards'

type ProjectsRenderProps = {
  isLoading: boolean
  data: Project[]
  onDeleteProject: (id: string) => void
  onRenameProject: (id: string, projectName: string) => void
}

export const ProjectsRender = ({
  data,
  onDeleteProject,
  onRenameProject,
  isLoading
}: ProjectsRenderProps) => {
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
              <ProjectCard
                onRename={onRenameProject}
                onDelete={onDeleteProject}
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
