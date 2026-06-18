<script setup lang="ts">
definePageMeta({ layout: false })

const { login, isLoggedIn } = useAuth()
const { error } = useToast()

if (isLoggedIn.value) navigateTo('/dashboard')

const form = reactive({ email: '', password: '' })
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    await login(form.email, form.password)
    navigateTo('/dashboard')
  } catch (e: any) {
    error(e?.data?.message || 'Email atau password salah')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-bold text-white mb-2 text-center">CV Admin</h1>
      <p class="text-slate-400 text-sm text-center mb-8">Masuk ke panel admin</p>

      <form @submit.prevent="onSubmit" class="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
          <input v-model="form.password" type="password" required
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
          {{ loading ? 'Masuk...' : 'Masuk' }}
        </button>
        <p class="text-center text-sm text-slate-400">
          Belum punya akun?
          <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300">Daftar</NuxtLink>
        </p>
      </form>
    </div>
    <UiToast />
  </div>
</template>
