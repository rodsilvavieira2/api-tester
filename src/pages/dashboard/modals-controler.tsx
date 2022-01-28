import { useDispatch, useSelector } from 'react-redux'

import { CreateNewProject, CreateNewProjectItem, CreateNewProjectItemFolder, DuplicateProjectItem, RenameProjectItem } from '../../components/organisms/modals'
import {
  selectDuplicateProjectItemInfo,
  selectIsCreateNewProjectItemModalOpen,
  selectIsCreateNewProjectModalOpen,
  selectNewProjectItemFolderInfo,
  selectRenameProjectItemInfo,
  setDuplicateProjectItemInfo,
  setNewProjectItemFolderInfo,
  setRenameProjectItemInfo,
  toggleCreateNewProjectItemOpen,
  toggleCreateNewProjectOpen
} from '../../redux/slices'

export const ModalsController = () => {
  const appDispatch = useDispatch()

  const isCreateNewProjectModalOpen = useSelector(selectIsCreateNewProjectModalOpen)
  const isCreateNewProjectItemModalOpen = useSelector(selectIsCreateNewProjectItemModalOpen)
  const duplicateProjectItemInfo = useSelector(selectDuplicateProjectItemInfo)
  const renameProjectItemInfo = useSelector(selectRenameProjectItemInfo)
  const newProjectItemFolderInfo = useSelector(selectNewProjectItemFolderInfo)

  return (
    <>
      <CreateNewProject
        isOpen={isCreateNewProjectModalOpen}
        onClose={() => appDispatch(toggleCreateNewProjectOpen())}
      />
      <CreateNewProjectItem
        isOpen={isCreateNewProjectItemModalOpen}
        onClose={() => appDispatch(toggleCreateNewProjectItemOpen())}
      />

      <DuplicateProjectItem
        isOpen={duplicateProjectItemInfo.isOpen}
        projectItemName={duplicateProjectItemInfo.currentProjectItemName}
        onClose={() =>
          appDispatch(
            setDuplicateProjectItemInfo({
              isOpen: false,
              currentProjectItemName: ''
            })
          )
        }
      />

      <CreateNewProjectItemFolder
        isOpen={newProjectItemFolderInfo.isOpen}
        id={newProjectItemFolderInfo.id}
        onClose={() => appDispatch(setNewProjectItemFolderInfo({
          id: '',
          isOpen: false
        }))}
      />

      <RenameProjectItem
        isOpen={renameProjectItemInfo.isOpen}
        projectItemName={renameProjectItemInfo.currentProjectItemName}
        id={renameProjectItemInfo.id}
        onClose={() =>
          appDispatch(
            setRenameProjectItemInfo({
              isOpen: false,
              currentProjectItemName: '',
              id: ''
            })
          )
        }
      />
    </>
  )
}
