/* eslint-disable @typescript-eslint/no-empty-function */
import { useMemo } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
// import { RiStackFill } from 'react-icons/ri'

import {
  DashboardActionsBar,
  DashboardEmptyProjectList,
  DashboardLoadingContent
} from '../../../../components/organisms/dashboard'
import {
  selectAllProjects,
  useGetAllProjectsQuery
} from '../../../../redux/apis'
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
          onClick: () => {}
        }
      ]
    }
  }, [])

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
