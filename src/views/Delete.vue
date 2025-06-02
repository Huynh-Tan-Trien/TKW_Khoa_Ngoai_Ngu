<template>
    <HeaderWeb/>
    <div class="container mt-5">
      <h2 class="text-center mb-4 fw-bold">Quản lý tài khoản</h2>
  
      <!-- Bộ lọc và tìm kiếm -->
      <div class="filter-box d-flex flex-wrap gap-3 mb-4">
        <input
          v-model="searchQuery"
          class="form-control shadow-sm"
          placeholder="🔍 Tìm kiếm theo tên hoặc email"
        />
        <select v-model="roleFilter" class="form-select shadow-sm w-auto">
          <option value="">Tất cả vai trò</option>
          <option value="Sinh viên">Sinh viên</option>
          <option value="Giảng viên">Giảng viên</option>
        </select>
      </div>
  
      <!-- Bảng người dùng -->
      <div class="table-responsive">
        <table class="table table-hover table-bordered shadow-sm rounded-table align-middle">
          <thead class="table-primary text-center">
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" :key="user.id">
              <!-- Cột tên -->
              <td v-if="editingId !== user.id">{{ user.name }}</td>
              <td v-else><input v-model="editForm.name" class="form-control" /></td>
  
              <!-- Cột email -->
              <td v-if="editingId !== user.id">{{ user.email }}</td>
              <td v-else><input v-model="editForm.email" class="form-control" /></td>
  
              <!-- Cột vai trò -->
              <td v-if="editingId !== user.id">{{ user.role }}</td>
              <td v-else>
                <select v-model="editForm.role" class="form-select">
                  <option value="Sinh viên">Sinh viên</option>
                  <option value="Giảng viên">Giảng viên</option>
                </select>
              </td>
  
              <!-- Cột hành động -->
              <td class="text-center">
                <div v-if="editingId === user.id">
                  <button class="btn btn-success btn-sm me-2" @click="updateUser(user.id)">💾 Lưu</button>
                  <button class="btn btn-secondary btn-sm" @click="cancelEdit">✖ Hủy</button>
                </div>
                <div v-else>
                  <button class="btn btn-primary btn-sm me-2" @click="editUser(user)">✏️ Sửa</button>
                  <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">🗑 Xóa</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <p v-if="filteredUsers.length === 0" class="text-center text-muted mt-4">Không có tài khoản phù hợp</p>
    </div>
    <FooterWeb/>
  </template>
  
  <script setup>
  import HeaderWeb from '@/components/HeaderWeb.vue'
  import FooterWeb from '@/components/FooterWeb.vue'
  import { ref, computed, onMounted } from 'vue'
  import supabase from '../supabase'
  
  const users = ref([])
  const editingId = ref(null)
  const editForm = ref({ name: '', email: '', role: '' })
  
  const searchQuery = ref('')
  const roleFilter = ref('')
  
const fetchUsers = async () => {
  const [studentsRes, teachersRes] = await Promise.all([
    supabase.from('students').select('*'),
    supabase.from('teachers').select('*')
  ])

  if (studentsRes.error) console.error(studentsRes.error)
  if (teachersRes.error) console.error(teachersRes.error)

  users.value = [
    ...(studentsRes.data || []),
    ...(teachersRes.data || [])
  ]
}

  
const deleteUser = async (id) => {
  const user = users.value.find(u => u.id === id)
  if (!user) return

  const confirmDelete = confirm('Bạn có chắc muốn xóa tài khoản này?')
  if (!confirmDelete) return

  let table = ''
  if (user.role === 'Sinh viên') {
    table = 'students'
  } else if (user.role === 'Giảng viên') {
    table = 'teachers'
  } else {
    alert('Không thể xóa tài khoản này!')
    return
  }

  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) console.error(error)
  else fetchUsers()
}

  
  const editUser = (user) => {
    editingId.value = user.id
    editForm.value = { ...user }
  }
  
  const cancelEdit = () => {
    editingId.value = null
    editForm.value = { name: '', email: '', role: '' }
  }
  
const updateUser = async (id) => {
  let table = ''
  if (editForm.value.role === 'Sinh viên') {
    table = 'students'
  } else if (editForm.value.role === 'Giảng viên') {
    table = 'teachers'
  } else {
    alert('Không thể cập nhật tài khoản này!')
    return
  }

  const { error } = await supabase.from(table).update({
    name: editForm.value.name,
    email: editForm.value.email,
    role: editForm.value.role
  }).eq('id', id)

  if (error) {
    console.error(error)
  } else {
    editingId.value = null
    fetchUsers()
  }
}

  
    const filteredUsers = computed(() => {
        return users.value
            .filter(user => user.role !== 'admin') // Loại bỏ admin
            .filter(user => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.value.toLowerCase())

            const matchesRole =
                roleFilter.value === '' || user.role === roleFilter.value

            return matchesSearch && matchesRole
            })
    })

  
  onMounted(() => {
    fetchUsers()
  })
  </script>
  
  <style scoped>
  .filter-box input,
  .filter-box select {
    min-width: 220px;
  }
  
  .rounded-table {
    border-radius: 8px;
    overflow: hidden;
  }
  
  .table-hover tbody tr:hover {
    background-color: #f1f9ff;
    transition: 0.2s;
  }
  
  .btn {
    min-width: 70px;
  }
  </style>
  