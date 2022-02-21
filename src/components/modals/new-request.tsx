import { useState } from 'react'

import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  HStack,
  Select,
  Modal,
  ModalOverlay
} from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'

import { HttpMethods } from '../../@types'
import { DefaultModalProps } from './types'

type NewQuestModalProps = {
  projectID: string
  projectItemID: string
  parentID?: string
} & DefaultModalProps

const httpMethods = [
  'GET',
  'PUT',
  'DELETE',
  'POST',
  'DELETE',
  'OPTIONS',
  'HEAD'
]

export const NewQuestModal = ({
  isOpen,
  onClose,
  projectID,
  projectItemID,
  parentID
}: NewQuestModalProps) => {
  const [name, setName] = useState('')
  const [method, setMethod] = useState<HttpMethods>('GET')
  const creatRequest = (params:any) => {
    console.log(params)
  }

  const onClick = () => {
    creatRequest({
      method,
      name,
      projectID,
      projectItemID,
      parentID
    })
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nova requisição</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <HStack>
            <Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <Select
              value={method}
              onChange={(e) => setMethod(e.currentTarget.value as HttpMethods)}
            >
              {httpMethods.map((httpMethod) => (
                <option key={nanoid()} value={httpMethod}>
                  {httpMethod}
                </option>
              ))}
            </Select>
          </HStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClick}> Criar </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
