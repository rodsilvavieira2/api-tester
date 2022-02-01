import { useState } from 'react'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

import { DefaultModalProps } from './shared'

export type MakeActionModalProps = {
  headerText: string
  actionButtonText: string
  defaultValue?: string
  onAction: (value: string) => Promise<void>
} & DefaultModalProps

type ContentProps = Omit<MakeActionModalProps, 'isOpen'>

const Content = ({
  onAction,
  headerText,
  onClose,
  actionButtonText,
  defaultValue
}: ContentProps) => {
  const [value, setValue] = useState(() => defaultValue ?? '')

  const onClick = () => {
    onClose()
    onAction(value)
  }

  return (
    <ModalContent>
      <ModalHeader>{headerText}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
      </ModalBody>

      <ModalFooter>
        <Button onClick={onClick}>{actionButtonText}</Button>
      </ModalFooter>
    </ModalContent>
  )
}

export const MakeActionModal = ({
  onAction,
  headerText,
  actionButtonText,
  isOpen,
  onClose,
  defaultValue
}: MakeActionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <Content
        {...{ onAction, headerText, actionButtonText, onClose, defaultValue }}
      />
    </Modal>
  )
}
