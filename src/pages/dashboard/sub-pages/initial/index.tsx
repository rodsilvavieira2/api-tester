import { useMemo } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  DashboardActionsBar,
  DashboardEmptyProjectList,
  DashboardLoadingContent
} from '../../../../components/organisms/dashboard'
import {
  selectAllProjects,
  useGetAllProjectsQuery
} from '../../../../redux/apis'
import { setDecisionAction } from '../../../../redux/slices'
import { ProjectsRender } from './projects-render'

export default function Initial () {
  const { isLoading, projects } = useGetAllProjectsQuery(undefined, {
    selectFromResult ({ data = { entities: {}, ids: [] }, ...rest }) {
      return {
        ...rest,
        projects: selectAllProjects(data)
      }
    }
  })

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

  if (projects.length === 0) {
    return <DashboardEmptyProjectList />
  }

  return (
    <>
      <DashboardActionsBar menuConfig={menuConfig}/>

     <ProjectsRender data={projects}/>
    </>
  )
}
