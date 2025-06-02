import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  // state
  const ms = ref(null)
  const email = ref(null)
  const name = ref(null)       
  const role = ref(null)
  const isLoggedIn = ref(false)

  // actions
  function setUser(userMs, userEmail, userName, userRole) {
    ms.value = userMs
    email.value = userEmail
    name.value = userName     
    role.value = userRole
    isLoggedIn.value = true
  }

  function logout() {
    ms.value = null
    email.value = null
    name.value = null       
    role.value = null
    isLoggedIn.value = false
  }

  return {
    ms,
    email,
    name,         
    role,
    isLoggedIn,
    setUser,
    logout
  }
},{
  persist: true // ✅ Thêm dòng này để tự động lưu và khôi phục
}
)