import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Stack } from '@chakra-ui/react'

import { useGetProjectItemExploreQuery } from '../../../redux/apis'
import { Folder } from './folder'
import { RequestItem } from './request-item'

type Params = {
  projectID: string
  projectItemID: string
}

export const ExploreTreeContainer = () => {
  const [tree, setTree] = useState<JSX.Element[] | null>(null)
  const { projectID = '', projectItemID = '' } = useParams<Params>()

  const { data = [] } = useGetProjectItemExploreQuery({
    projectID,
    projectItemID
  })

  const render = useMemo(() => {
    return async () =>
      data.map((item) => {
        if (item.childrens) {
          return (
            <Folder key={item.id} {...item}>
              {item.childrens.map((children) => (
                <RequestItem key={children.id} {...children} />
              ))}
            </Folder>
          )
        }

        return <RequestItem key={item.id} {...item} />
      })
  }, [data])

  useEffect(() => {
    render().then((items) => setTree(items))
  }, [render])

  return (
    <Stack p="1" spacing="3" maxH="100%" overflowY="auto">
      {tree}
    </Stack>
  )
}
