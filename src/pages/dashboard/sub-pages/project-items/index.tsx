import { useEffect, useMemo } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { MdInsertDriveFile } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { DashboardActionsBar, MenuActionsConfig } from '../../../../components'
import { useGetAllProjectItemsQuery } from '../../../../redux/apis'
import { setDecisionAction, setSearchValue } from '../../../../redux/slices'
import { ProjectItemsRenderContainer } from './project-items-render-container'

type Params = {
  id: string
}

export default function ProjectItems () {
  const { id = '' } = useParams<Params>()

  const { data = [], isLoading } = useGetAllProjectItemsQuery({ projectID: id })

  const appDispatch = useDispatch()

  useEffect(() => {
    appDispatch(setSearchValue(''))
  }, [appDispatch])

  const actionsMenuConfig = useMemo((): MenuActionsConfig => {
    return {
      menuButton: {
        text: 'Criar',
        icon: <HiPlusSm fontSize="1.2rem" />
      },
      menuList: [
        {
          onClick: () => {
            appDispatch(
              setDecisionAction({
                id,
                type: 'project_item.create'
              })
            )
          },
          text: 'Criar item de projeto',
          icon: <MdInsertDriveFile fontSize="1.2rem" />
        }
      ]
    }
  }, [appDispatch, id])

  return (
    <>
      <DashboardActionsBar menuConfig={actionsMenuConfig} />

      <ProjectItemsRenderContainer isLoading={isLoading} data={data} />
    </>
  )
}
