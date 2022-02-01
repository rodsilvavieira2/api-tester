import { useSelector } from 'react-redux'

import { useToast, useUpdateEffect } from '@chakra-ui/react'

import { selectToastData } from '../../redux/slices/user-macro-actions'

export const ToastsController = () => {
  const toast = useToast()
  const toastData = useSelector(selectToastData)

  useUpdateEffect(() => {
    if (toastData) {
      toast(toastData)
    }
  }, [toastData])

  return null
}
