interface Toast {
  id: number
  type: 'success' | 'error'
  message: string
}

const toasts = ref<Toast[]>([])
let nextId = 0

export const useToast = () => {
  const add = (type: Toast['type'], message: string) => {
    const id = nextId++
    toasts.value.push({ id, type, message })
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, 3500)
  }

  return {
    toasts: readonly(toasts),
    success: (msg: string) => add('success', msg),
    error: (msg: string) => add('error', msg),
  }
}
