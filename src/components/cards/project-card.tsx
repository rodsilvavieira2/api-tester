import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useRef, MouseEvent, memo } from 'react'
import {
  MdMoreHoriz,
  MdDriveFileRenameOutline,
  MdDelete,
  MdAccessTime
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

import { Project } from '../../@types'

const MotionLink = motion(Link)

type ProjectCardProps = {
  onDelete: (id: string) => void
  onRename: (id: string, currentName: string) => void
} & Pick<Project, 'id' | 'name' | 'created_at'>

const Base = ({
  id,
  name,
  created_at,
  onDelete,
  onRename
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement & HTMLAnchorElement>(null)
  const buttonWrapper = useRef<HTMLDivElement>(null)

  const onClick = (e: MouseEvent) => {
    if (buttonWrapper.current?.contains(e.target as any)) {
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
      cursor="pointer"
      transition="border 0.3s"
      _hover={{
        borderColor: 'primary'
      }}
      textDecoration='none'
      bg="white"
      to={`/dashboard/project/${id}`}
      onClick={onClick}
      as={MotionLink}
      ref={cardRef}
      whileHover={{
        y: -5
      }}
    >
      <Flex w="100%">
        <HStack w="50%" bg="#A0AEC0">
          <Icon ml="3" color="white" as={RiStackFill} />

          <Text color="white" fontSize="sm">
            Projeto
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

export const ProjectCard = memo(Base)
