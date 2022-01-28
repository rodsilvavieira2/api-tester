import dayjs from 'dayjs'
import { useMemo } from 'react'

import { SortBy } from '../@types'

type SortByItem = {
  id: string
  name: string
  created_at: string
}

type UseSortByParams<T> = {
  data: T[]
  sortBy: SortBy
}

export function useSortBy<T extends SortByItem> ({
  data,
  sortBy
}: UseSortByParams<T>) {
  return useMemo(() => {
    const sortObj = {
      newest: () => {
        return data.sort((a, b) => {
          if (dayjs(a.created_at).isAfter(b.created_at)) {
            return -1
          } else if (dayjs(a.created_at).isBefore(b.created_at)) {
            return 1
          }

          return 0
        })
      },
      oldest: () => {
        return data.sort((a, b) => {
          if (dayjs(a.created_at).isAfter(b.created_at)) {
            return 1
          } else if (dayjs(a.created_at).isBefore(b.created_at)) {
            return -1
          }

          return 0
        })
      },
      ascending: () => {
        return data.sort((a, b) => {
          if (a.name > b.name) {
            return 1
          } else if (a.name < b.name) {
            return -1
          }

          return 0
        })
      },
      descending: () => {
        return data.sort((a, b) => {
          if (a.name > b.name) {
            return -1
          } else if (a.name < b.name) {
            return 1
          }

          return 0
        })
      }
    }

    return sortObj[sortBy]()
  }, [data, sortBy])
}
