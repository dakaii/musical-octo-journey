import { useState } from 'react'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

async function getProjects() {
  // const res = await fetch('https://api.gcfund.org/v1/projects')
  const res = await fetch('../mock_json_response.json')
  console.log(res)
  return await res.json()
}

function LandingPage() {
  const [count, setCount] = useState(0)
  const queryClient = useQueryClient()

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['projects'], queryFn: getProjects
  })
  const res = fetch('../mock_json_response.json')
  console.log(res)

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  // We can assume by this point that `isSuccess === true`
  return (
    <ul>
      {data.map((project) => (
        <li key={project.id}>{project.title}</li>
      ))}
    </ul>
  )
}

export default LandingPage
