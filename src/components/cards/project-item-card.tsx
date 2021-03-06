import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { memo, MouseEvent, useRef } from 'react'
import {
  MdAccessTime,
  MdDelete,
  MdDriveFileRenameOutline,
  MdFileCopy,
  MdMoreHoriz
} from 'react-icons/md'
import { RiStackFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text
} from '@chakra-ui/react'

const MotionLink = motion(Link)

type ProjectItemProps = {
  id: string
  name: string
  created_at: string
  projectID: string
  onDelete: (id: string) => void
  onRename: (id: string, currentName: string) => void
  onDuplicate: (name: string) => void
}

const Base = ({
  id,
  name,
  created_at,
  onDelete,
  onDuplicate,
  projectID,
  onRename
}: ProjectItemProps) => {
  const cardRef = useRef<HTMLDivElement & HTMLAnchorElement>(null)
  const buttonWrapper = useRef<HTMLDivElement>(null)

  const onClick = (e: MouseEvent) => {
    if (
      buttonWrapper.current?.contains(e.target as any)
    ) {
      e.preventDefault()
    }
  }

  return (
    <Flex
      boxShadow="lg"
      flexDirection="column"
      py="3"
      border="1px solid"
      borderColor="border.primary"
      borderRadius="base"
      h="250px"
      maxW="15.375rem"
      cursor="pointer"
      transition="border 0.3s"
      _hover={{
        borderColor: 'primary'
      }}
      bg="white"
      to={`/dashboard/project/${projectID}/items/${id}`}
      onClick={onClick}
      as={MotionLink}
      ref={cardRef}
    >
      <Flex w="100%">
        <HStack w="50%" bg="#A0AEC0">
          <Icon ml="3" color="white" as={RiStackFill} />

          <Text color="white" fontSize="sm">
            Coleção
          </Text>
        </HStack>

        <Flex w="50%">
          <Box ml="auto" ref={buttonWrapper}>
            <Menu>
              <MenuButton
                mr="3"
                aria-label="mais opções"
                as={IconButton}
                size="sm"
                ml="auto"
                icon={<MdMoreHoriz />}
              />

              <MenuList>
                <MenuItem
                  onClick={() => onDuplicate(name)}
                  icon={<MdFileCopy fontSize="1.2rem" />}
                >
                  Duplicar
                </MenuItem>

                <MenuItem
                  onClick={() => onRename(id, name)}
                  icon={<MdDriveFileRenameOutline fontSize="1.2rem" />}
                >
                  Renomear
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  onClick={() => onDelete(id)}
                  icon={<MdDelete fontSize="1.2rem" />}
                  color="red.500"
                >
                  Deletar
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex flex="1" flexDirection="column" p="3" pb="0">
        <Text mt="2">{name}</Text>

        <HStack mt="auto">
          <Icon as={MdAccessTime} />

          <Text fontWeight="semibold" as="small">
            {dayjs(created_at).format('[Criado:] DD-MM-YYYY')}
          </Text>
        </HStack>
      </Flex>
    </Flex>
  )
}

export const ProjectItemCard = memo(Base)
