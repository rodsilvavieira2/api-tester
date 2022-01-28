import { HiPlus } from 'react-icons/hi'
import { MdDesktopWindows } from 'react-icons/md'
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
  selectCurrentProject,
  setCurrentProject,
  toggleCreateNewProjectOpen
} from '../../../redux/slices'

export const DashBoardNavigationBar = () => {
  const currentProject = useSelector(selectCurrentProject)
  const availableProjects = useSelector(selectAvailableProjects)

  const appDispatch = useDispatch()

  const onChangeProject = (name: string) => {
    appDispatch(setCurrentProject(name))
  }

  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <Menu>
          <MenuButton variant="link" as={Button}>
            {currentProject.length
              ? currentProject
              : availableProjects[0]?.name}
          </MenuButton>

          <MenuList overflowX="auto" maxH="15rem">
            <MenuItem icon={<RiHome3Fill fontSize="1.2rem" />}>
              {currentProject}
            </MenuItem>

            <MenuItem
              icon={<HiPlus />}
              onClick={() => appDispatch(toggleCreateNewProjectOpen())}
            >
              criar novo projeto
            </MenuItem>
            <MenuDivider />

            <MenuGroup maxH="20rem" title="Todos os projetos">
              {availableProjects
                .filter((item) => item.name !== currentProject)
                .map((item) => (
                  <MenuItem
                    icon={<MdDesktopWindows fontSize="1.2rem" />}
                    key={item.id}
                    onClick={() => onChangeProject(item.name)}
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
