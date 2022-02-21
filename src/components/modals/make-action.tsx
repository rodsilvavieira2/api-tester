import { useEffect, useRef, useState } from 'react'

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

import { DefaultModalProps } from './types'

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
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue ?? ''
  }, [defaultValue])

  const onClick = () => {
    onClose()
    if (inputRef.current) onAction(inputRef.current.value)
  }

  return (
    <ModalContent>
      <ModalHeader>{headerText}</ModalHeader>
      <ModalCloseButton />

      <ModalBody>
        <Input
          ref={inputRef}
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
