export const useConfigApi = () => {
  const config = useRuntimeConfig()
  const { authHeaders } = useAuth()

  const fetchConfig = async () => {
    const res = await $fetch<{ data: { default_version: string } }>(`${config.public.apiUrl}/config`, {
      headers: authHeaders.value,
    })
    return res.data
  }

  const saveConfig = async (defaultVersion: string) => {
    const res = await $fetch<{ data: any }>(`${config.public.apiUrl}/config`, {
      method: 'PUT',
      headers: authHeaders.value,
      body: { default_version: defaultVersion },
    })
    return res.data
  }

  return { fetchConfig, saveConfig }
}
