import { useMemo } from 'react'

type Item = {
  id: string,
  name: string
}

type useSearchPrams<T > = {
  data: T[]
  searchValue:string
}

export function useSearch<T extends Item> ({ data, searchValue }: useSearchPrams<T>) {
  return useMemo(() => {
    if (!searchValue.length) return data

    return data.filter(({ name }) => {
      return name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    })
  }, [data, searchValue])
}
