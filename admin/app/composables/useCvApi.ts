export const useCvApi = () => {
  const config = useRuntimeConfig()
  const { authHeaders } = useAuth()

  const fetchCv = async () => {
    const res = await $fetch<{ data: any }>(`${config.public.apiUrl}/cv`, {
      headers: authHeaders.value,
    })
    return res.data
  }

  const saveCv = async (data: any) => {
    await $fetch(`${config.public.apiUrl}/cv`, {
      method: 'PUT',
      headers: { ...authHeaders.value, 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }

  return { fetchCv, saveCv }
}
