<script setup lang="ts">
definePageMeta({ layout: false })

const { register, isLoggedIn } = useAuth()
const { error } = useToast()

if (isLoggedIn.value) navigateTo('/dashboard')

const form = reactive({ username: '', name: '', email: '', password: '' })
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    await register(form.username, form.name, form.email, form.password)
    navigateTo('/dashboard')
  } catch (e: any) {
    error(e?.data?.message || 'Gagal mendaftar')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <h1 class="text-2xl font-bold text-white mb-2 text-center">Daftar Akun</h1>
      <p class="text-slate-400 text-sm text-center mb-8">Buat akun portfolio kamu</p>

      <form @submit.prevent="onSubmit" class="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 space-y-4">
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Username</label>
          <input v-model="form.username" type="text" required placeholder="waluyo"
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
          <p class="text-xs text-slate-500 mt-1">URL portfolio: domain.com/p/username</p>
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Nama Lengkap</label>
          <input v-model="form.name" type="text" required
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Email</label>
          <input v-model="form.email" type="email" required
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label class="text-sm font-medium text-slate-300 mb-1.5 block">Password</label>
          <input v-model="form.password" type="password" required minlength="8"
            class="w-full bg-slate-800 border border-slate-600 rounded-lg px-3.5 py-2.5 text-sm text-slate-100 focus:border-blue-500 focus:outline-none" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors">
          {{ loading ? 'Mendaftar...' : 'Daftar' }}
        </button>
        <p class="text-center text-sm text-slate-400">
          Sudah punya akun?
          <NuxtLink to="/login" class="text-blue-400 hover:text-blue-300">Masuk</NuxtLink>
        </p>
      </form>
    </div>
    <UiToast />
  </div>
</template>
