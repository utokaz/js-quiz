import { useRoutes, RouteObject } from 'react-router-dom'
import { NotFound } from '../page/NotFound'
import { Quiz } from '../page/Quiz'
import { Result } from '../page/Result'
import { Top } from '../page/Top'

export const AppRoutes = () => {
  const routes: RouteObject[] = [
    { path: '/', element: <Top /> },
    { path: '/quiz', element: <Quiz /> },
    { path: '/result', element: <Result /> },
    { path: '/*', element: <NotFound /> },
  ]

  const element = useRoutes(routes)

  return <>{element}</>
}
