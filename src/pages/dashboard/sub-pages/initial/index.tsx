import { useEffect, useMemo } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import {
  DashboardActionsBar,
  DashboardEmptyProjectList
} from '../../../../components/dashboard'
import {
  useGetAllProjectsQuery
} from '../../../../redux/apis'
import { setModalData, setSearchValue } from '../../../../redux/slices'
import { ProjectRenderContainer } from './projects-render-container'

export default function Initial () {
  const { isLoading, data = [], currentData } = useGetAllProjectsQuery()

  const appDispatch = useDispatch()

  useEffect(() => {
    appDispatch(setSearchValue(''))
  }, [appDispatch])

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
          onClick: () => appDispatch(setModalData({
            type: 'project.create'
          }))
        }
      ]
    }
  }, [appDispatch])

  if (data.length === 0 && currentData) {
    return <DashboardEmptyProjectList />
  }

  return (
    <>
      <DashboardActionsBar menuConfig={menuConfig} />

      <ProjectRenderContainer isLoading={isLoading} data={data} />
    </>
  )
}
