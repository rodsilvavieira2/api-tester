import { useMemo } from 'react'
import { HiPlus } from 'react-icons/hi'
import { MdDesktopWindows, MdEdit } from 'react-icons/md'
import { RiHome3Fill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import {
  Breadcrumb,
  BreadcrumbItem,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuGroup
} from '@chakra-ui/react'

import {
  selectAvailableProjects,
  useGetAllProjectsQuery
} from '../../../redux/apis'
import {
  selectCurrentProjectID,
  setCurrentProjectID,
  setDecisionAction
} from '../../../redux/slices'

export const DashBoardNavigationBar = () => {
  const currentProjectID = useSelector(selectCurrentProjectID)

  const { availableProjects } = useGetAllProjectsQuery(undefined, {
    selectFromResult: ({ data = { entities: {}, ids: [] } }) => ({
      availableProjects: selectAvailableProjects(data)
    })
  })

  const appDispatch = useDispatch()

  const onChangeProject = (id: string) => {
    appDispatch(setCurrentProjectID(id))
  }

  const currentProjectName = useMemo(() => {
    const currentProject = availableProjects.find(project => project.id === currentProjectID)

    if (currentProject) return currentProject.name

    return availableProjects[0]?.name
  }, [availableProjects, currentProjectID])

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Menu>
          <MenuButton variant="link" as={Button}>
            {currentProjectName}
          </MenuButton>

          <MenuList overflowX="auto" maxH="15rem">
            <MenuGroup title="Projeto atual">
              <MenuItem icon={<RiHome3Fill fontSize="1.3rem" />}>
                {currentProjectName}
              </MenuItem>

              <MenuItem
                icon={<HiPlus />}
                onClick={() =>
                  appDispatch(
                    setDecisionAction({
                      id: null,
                      isOpen: true,
                      type: 'project.create'
                    })
                  )
                }
              >
                criar novo projeto
              </MenuItem>

              <MenuItem
                icon={<MdEdit fontSize="1.3rem" />}
                onClick={() =>
                  appDispatch(
                    setDecisionAction({
                      id: currentProjectID,
                      isOpen: true,
                      type: 'project.rename',
                      defaultValues: {
                        name: currentProjectName
                      }
                    })
                  )
                }
              >
                renomar projeto
              </MenuItem>
            </MenuGroup>

            <MenuDivider />

            <MenuGroup maxH="20rem" title="Todos os projetos">
              {availableProjects
                .filter((item) => item.id !== currentProjectID)
                .map((item) => (
                  <MenuItem
                    icon={<MdDesktopWindows fontSize="1.2rem" />}
                    key={item.id}
                    onClick={() => onChangeProject(item.id)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
            </MenuGroup>
          </MenuList>
        </Menu>
      </BreadcrumbItem>
    </Breadcrumb>
  )
}
