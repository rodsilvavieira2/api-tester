import { useMemo } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  DashboardActionsBar,
  DashboardEmptyProjectList,
  DashboardLoadingContent
} from '../../../../components/dashboard'
import {
  useGetAllProjectsQuery
} from '../../../../redux/apis'
import { setDecisionAction } from '../../../../redux/slices'
import { ProjectRenderContainer } from './projects-render-container'

export default function Initial () {
  const { isLoading, data = [] } = useGetAllProjectsQuery()

  const appDispatch = useDispatch()

  const menuConfig = useMemo(() => {
    return {
      menuButton: {
        text: 'Criar',
        icon: <HiPlusSm fontSize="1.2rem" />
      },
      menuList: [
        {
          text: 'Criar novo projeto',
          icon: <MdInsertDriveFile fontSize="1.2rem" />,
          onClick: () => appDispatch(setDecisionAction({
            id: null,
            type: 'project.create'
          }))
        }
      ]
    }
  }, [appDispatch])

  if (isLoading) {
    return <DashboardLoadingContent />
  }

  if (data.length === 0) {
    return <DashboardEmptyProjectList />
  }

  return (
    <>
      <DashboardActionsBar menuConfig={menuConfig} />

      <ProjectRenderContainer data={data} />
    </>
  )
}
