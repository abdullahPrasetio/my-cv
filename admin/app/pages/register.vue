<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useAuth } from '../composables/useAuth'

definePageMeta({ layout: false })

const { register, isLoggedIn } = useAuth()
const { init } = useTheme()
const { error } = useToast()

if (isLoggedIn.value) navigateTo('/dashboard')

const form = reactive({ username: '', name: '', email: '', password: '' })
const loading = ref(false)

onMounted(() => init())

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
  <div class="min-h-screen app-shell flex items-center justify-center p-4">
    <div class="w-full max-w-sm">
      <!-- Brand -->
      <div class="flex items-center justify-center gap-2.5 mb-8">
        <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-black">CV</div>
        <div>
          <h1 class="text-xl font-bold text-heading leading-tight">Portfolio Admin</h1>
          <p class="text-xs text-muted">Buat akun portfolio kamu</p>
        </div>
      </div>

      <form @submit.prevent="onSubmit" class="surface-card rounded-2xl p-6 space-y-4 shadow-xl shadow-black/10">
        <div>
          <label class="text-label">Username</label>
          <input v-model="form.username" type="text" required placeholder="waluyo" class="input-field" />
          <p class="text-xs text-muted mt-1">URL portfolio: domain.com/p/username</p>
        </div>
        <div>
          <label class="text-label">Nama Lengkap</label>
          <input v-model="form.name" type="text" required class="input-field" />
        </div>
        <div>
          <label class="text-label">Email</label>
          <input v-model="form.email" type="email" required class="input-field" />
        </div>
        <div>
          <label class="text-label">Password</label>
          <input v-model="form.password" type="password" required minlength="8" class="input-field" />
        </div>
        <button type="submit" :disabled="loading"
          class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
          {{ loading ? 'Mendaftar...' : 'Daftar' }}
        </button>
        <p class="text-center text-sm text-muted">
          Sudah punya akun?
          <NuxtLink to="/login" class="text-blue-500 hover:text-blue-400 font-medium">Masuk</NuxtLink>
        </p>
      </form>
    </div>
    <UiToast />
  </div>
</template>
