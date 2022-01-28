
import { DashboardActionsBar } from '../../../../components/organisms/dashboard'
import { DashboardLoadingContent } from '../../../../components/organisms/dashboard/'
import {
  useGetAllProjectsQuery,
  selectAllProjects
} from '../../../../redux/apis'
import { EmptyProjectList } from './empty-project-list'
import { Projects } from './projects'

export default function Initial () {
  const { projects, isLoading, currentData } = useGetAllProjectsQuery(undefined, {
    selectFromResult: ({ data = { entities: {}, ids: [] }, ...rest }) => {
      return {
        ...rest,
        projects: selectAllProjects(data)
      }
    }
  })

  if (isLoading) {
    return <DashboardLoadingContent />
  }

  if (!projects.length && currentData) {
    return <EmptyProjectList />
  }

  return (
    <>
      <DashboardActionsBar
      />

      <Projects />
    </>
  )
}
