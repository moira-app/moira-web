import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '~shared/queryClient'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Router from './router'

function App() {
  return (
    <GoogleOAuthProvider clientId="813818295925-avjanfkqngg5ve50jtnu1me5jp3t98h5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App
