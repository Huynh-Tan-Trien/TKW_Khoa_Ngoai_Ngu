<template>
  <div class="can-bo-card">
    <router-link to="/about/nhansu">
      <button type="button" class="btn btn-primary mb-3">Trở lại</button>
    </router-link>

    <div v-if="selectedTeacher" class="info">
      <img
        class="avatar"
        :src="selectedTeacher.avatarUrl || '/default-avatar.png'"
        :alt="'Ảnh của ' + (selectedTeacher.name || 'giảng viên')"
      />

      <div class="details">
        <ul>
          <li>
            <strong>Mã số GV:</strong> {{ selectedTeacher.msgv || 'Đang cập nhật' }}<br />
            <strong>Họ tên:</strong> {{ selectedTeacher.name || 'Đang cập nhật' }}<br />
            <strong>Email:</strong> {{ selectedTeacher.email || 'Đang cập nhật' }}<br />
            <strong>Chức vụ:</strong> {{ selectedTeacher.role || 'Đang cập nhật' }}<br />
            <strong>Ngày sinh:</strong> {{ selectedTeacher.birthday || 'Đang cập nhật' }}<br />
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import supabase from '@/supabase'  // import supabase client

const route = useRoute()
const selectedTeacher = ref(null)

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) return

  const { data, error } = await supabase
    .from('teachers')             // tên bảng của bạn
    .select('*')
    .eq('id', id)
    .single()                    // lấy 1 bản ghi duy nhất

  if (error) {
    console.error('Lỗi khi tải dữ liệu giảng viên:', error)
    selectedTeacher.value = null
  } else {
    selectedTeacher.value = data
  }
})
</script>


<style scoped>
.can-bo-card {
  max-width: 700px;
  margin: auto;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

.info {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.avatar {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid #ccc;
}

.details {
  flex: 1;
}

.details ul {
  padding-left: 20px;
  margin: 6px 0;
}
</style>
