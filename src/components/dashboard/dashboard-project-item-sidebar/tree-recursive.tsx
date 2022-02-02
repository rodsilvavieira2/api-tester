import { ExplorerTreeNode } from '../../../@types'
import { Folder } from './folder'
import { RequestItem } from './request-item'

type TreeRecursiveProps = {
  data: ExplorerTreeNode[]
}

export const TreeRecursive = ({ data }: TreeRecursiveProps) => {
  return (
    <>
      {data.map((item) => {
        if (!item.childrens) {
          return <RequestItem key={item.id} {...item} />
        }

        return (
          <Folder key={item.id} {...item}>
            <TreeRecursive data={item.childrens} />
          </Folder>
        )
      })}
    </>
  )
}
