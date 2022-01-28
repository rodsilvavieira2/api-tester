import { useState } from 'react'
import { MdDelete } from 'react-icons/md'

import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  Stack
} from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'

type MultipartItem = {
  id: string
  key: string
  value: string
  checked: string
}

type Keys = keyof Omit<MultipartItem, 'id'>

export const Multipart = () => {
  const [keyValues, setKeyValues] = useState<MultipartItem[]>([
    {
      id: nanoid(),
      key: '',
      value: '',
      checked: 'true'
    }
  ])

  const onDelete = (id: string) => {
    if (keyValues.length > 1) {
      setKeyValues((prev) => prev.filter((item) => item.id !== id))
    } else {
      const current = keyValues.slice()
      current[0].key = ''
      current[0].value = ''
      current[0].checked = 'true'

      setKeyValues(current)
    }
  }

  const onNewItem = () =>
    setKeyValues((prev) => [
      ...prev,
      {
        id: nanoid(),
        value: '',
        key: '',
        checked: 'true'
      }
    ])

  const onChange = (id: string, value: string, prop: Keys) => {
    const current = keyValues.slice()

    const index = keyValues.findIndex((item) => item.id === id)

    if (index > -1) {
      current[index][prop] = value

      setKeyValues(current)
    }
  }

  const getValue = (id: string, props: Keys) => {
    const keyValue = keyValues.find((item) => item.id === id)

    if (keyValue) {
      return keyValue[props]
    }

    return ''
  }

  return (
    <Stack>
      <Button onClick={onNewItem} alignSelf="flex-start" size="sm">
        Novo item
      </Button>

      <Stack>
        {keyValues.map(({ id }) => (
          <HStack key={id}>
            <Input
              size="sm"
              value={getValue(id, 'key')}
              onChange={(e) => onChange(id, e.currentTarget.value, 'key')}
              placeholder="Novo Nome"
            />

            <Input
              size="sm"
              value={getValue(id, 'value')}
              onChange={(e) => onChange(id, e.currentTarget.value, 'value')}
              placeholder="Novo Valor"
            />

            <HStack>
              <Checkbox
                onChange={(e) =>
                  onChange(id, String(e.currentTarget.checked), 'checked')
                }
                isChecked={getValue(id, 'checked') === 'true'}
              />

              <IconButton
                size="xs"
                variant="outline"
                aria-label="deletar par de chave e valor"
              >
                <MdDelete onClick={() => onDelete(id)} />
              </IconButton>
            </HStack>
          </HStack>
        ))}
      </Stack>
    </Stack>
  )
}
