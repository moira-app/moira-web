import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~shared/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SupabaseAuthProvider } from './auth'
import Router from './router'

function App() {
  return (
    // <SupabaseAuthProvider>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
    // </SupabaseAuthProvider>
  )
}

export default App
