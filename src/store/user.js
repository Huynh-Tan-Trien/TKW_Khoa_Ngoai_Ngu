import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const email = ref(null)
  const role = ref(null)
  const isLoggedIn = ref(false)

  // actions
  function setUser(userEmail, userRole) {
    email.value = userEmail
    role.value = userRole
    isLoggedIn.value = true
  }

  function logout() {
    email.value = null
    role.value = null
    isLoggedIn.value = false
  }

  return {
    email,
    role,
    isLoggedIn,
    setUser,
    logout
  }
  
})
