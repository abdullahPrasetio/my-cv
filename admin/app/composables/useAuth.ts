export const useAuth = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('cv_token', { maxAge: 60 * 60 * 24 })
  const user = useState<{ user_id: string; username?: string } | null>('auth_user', () => null)

  const isLoggedIn = computed(() => !!token.value)
  const authHeaders = computed(() => ({
    Authorization: `Bearer ${token.value ?? ''}`,
  }))

  const login = async (email: string, password: string) => {
    const res = await $fetch<{ data: { token: string; user: any } }>(`${config.public.apiUrl}/auth/login`, {
      method: 'POST',
      body: { email, password },
    })
    token.value = res.data.token
    user.value = res.data.user
  }

  const register = async (username: string, name: string, email: string, password: string) => {
    const res = await $fetch<{ data: { token: string; user: any } }>(`${config.public.apiUrl}/auth/register`, {
      method: 'POST',
      body: { username, name, email, password },
    })
    token.value = res.data.token
    user.value = res.data.user
  }

  const logout = () => {
    token.value = null
    user.value = null
    navigateTo('/login')
  }

  const fetchMe = async () => {
    if (!token.value) return
    try {
      const res = await $fetch<{ data: any }>(`${config.public.apiUrl}/auth/me`, {
        headers: authHeaders.value,
      })
      user.value = res.data
    } catch {
      token.value = null
    }
  }

  return { token, user, isLoggedIn, authHeaders, login, register, logout, fetchMe }
}
