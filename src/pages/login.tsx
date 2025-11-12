import { createFileRoute, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { authInstance } from '~shared/api/instance'
import { useUserStore } from '~entities/user/model/userStore'

export const Route = createFileRoute('/login')({
  validateSearch: (search) => ({
    redirect: (search.redirect as string) || '/'
  }),
  beforeLoad: ({ search }) => {
    const { isLoggedIn } = useUserStore.getState()
    console.log(search)
    if (isLoggedIn) {
      throw redirect({ to: search.redirect })
    }
  },
  component: LoginComponent
})

interface AuthResponse {
  mail: string
  password: string
}

function LoginComponent() {
  const router = useRouter()
  const { redirect } = Route.useSearch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const res = await authInstance.post<AuthResponse>('/member/login', {
        mail: email,
        password: password
      })
      console.log(res)
      console.log('로그인됨')
      router.history.push(redirect)
    } catch (err: any) {
      console.log(err)
      console.log(err.response?.data)
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'kakao') => {
    try {
      await auth.loginWithOAuth(provider)
    } catch (err: any) {
      setError(err.message || `OAuth login with ${provider} failed`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="max-w-md w-full space-y-4 p-6 border rounded-lg">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          type="button"
          onClick={() => handleOAuthLogin('kakao')}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
        >
          Continue with Kakao
        </button>
      </form>
    </div>
  )
}
