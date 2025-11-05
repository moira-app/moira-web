import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { queryClient } from '~shared/queryClient'
import { useSupabaseAuth, type SupabaseAuthState } from './auth'

// Create a new router instance
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultStructuralSharing: true,

  context: {
    queryClient
  },
  defaultPreload: 'intent', // preload when hovering over link
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0
})

export interface RouterContext {
  queryClient: typeof queryClient
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
    context: RouterContext
  }
}

function Router() {
  // const auth = useSupabaseAuth()

  // if (auth.isLoading) {
  //   return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  // }
  return <RouterProvider router={router} context={{ queryClient }} />
}

export default Router
