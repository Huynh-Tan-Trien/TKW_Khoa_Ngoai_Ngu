// @/auth.js
import supabase from '@/supabase'
import { useUserStore } from '@/store/user'

export async function fetchUserInfo() {
  const userStore = useUserStore()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  const role = user.user_metadata?.role
  const email = user.email
  const id = user.id

  if (!role) {
    userStore.logout()
    return false
  }

  if (role === 'Sinh viên') {
    const { data: student, error } = await supabase
      .from('students')
      .select('name')
      .eq('id', id)
      .single()

    if (student && !error) {
      userStore.setUser(email, student.name, 'student')
      return true
    } else {
      userStore.logout()
      return false
    }
  }

  if (role === 'Giảng viên' || role === 'admin') {
    const { data: teacher, error } = await supabase
      .from('teachers')
      .select('name')
      .eq('id', id)
      .single()

    if (teacher && !error) {
      const normalizedRole = role === 'Giảng viên' ? 'teacher' : 'admin'
      userStore.setUser(email, teacher.name, normalizedRole)
      return true
    } else {
      userStore.logout()
      return false
    }
  }

  userStore.logout()
  return false
}
