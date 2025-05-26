<template>
  <div class="can-bo-card">
    <router-link to="/about/nhansu">
      <button type="button" class="btn btn-primary mb-3">Trở lại</button>
    </router-link>

    <div v-if="selectedTeacher" class="info">
      <img
        class="avatar"
        :src="selectedTeacher.avatarUrl"
        :alt="'Ảnh của ' + selectedTeacher.hoTen"
      />

      <div class="details">
        <ul>
          <li>
            {{ selectedTeacher.hocVi }}: {{ selectedTeacher.hoTen }}<br />
            <strong>Chức vụ:</strong> {{ selectedTeacher.chucVu }}<br />
            <strong>Email:</strong> {{ selectedTeacher.email }}<br />
            <strong>Phòng:</strong> {{ selectedTeacher.phongLamViec }}<br />
            <strong>Tiểu sử:</strong> {{ selectedTeacher.tieuSu }}<br />
            <strong>Giảng dạy:</strong> {{ selectedTeacher.linhVucGiangDay }}<br />
            <strong>Thành tích:</strong> {{ selectedTeacher.thanhTich }}<br />
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const teacherData = ref([]);
const selectedTeacher = ref(null);

onMounted(async () => {
  const res = await fetch('/data/DSGV.json');
  teacherData.value = await res.json();
  selectedTeacher.value = teacherData.value.find(
    (t) => t.id === Number(route.params.id)
  );
});
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
