import { useParams } from 'react-router-dom'

type Params = {
  id: string
}

export default function ProjectItems () {
  const { id } = useParams<Params>()

  if (!id) return null
}
