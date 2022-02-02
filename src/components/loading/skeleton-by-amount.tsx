import { Skeleton } from '@chakra-ui/react'
import { nanoid } from '@reduxjs/toolkit'

type CardSkeletonByAmountProps = {
  amount: number
}

export const CardSkeletonByAmount = ({ amount }: CardSkeletonByAmountProps) => {
  return (
    <>
      {Array.from({ length: amount }).map(() => (
        <Skeleton key={nanoid()} h="250px" />
      ))}
    </>
  )
}
