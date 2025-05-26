<template>
  <div class="container py-5">
    <div class="row gy-4">
      <div class="col-md-6" v-for="(item, index) in items" :key="index">
        <div class="card shadow rounded-4 overflow-hidden">
          <div
            class="card-header text-center fw-bold py-3 text-dark"
            :style="gradientStyle"
            @click="toggleCard(index)"
            style="cursor: pointer;"
          >
            {{ item.title }}
          </div>

          <transition name="slide">
            <div
              v-show="openIndex === index"
              class="card-body text-dark small"
              v-html="item.content"
            />
          </transition>

          <div v-if="openIndex === index && (item.id === 1 || item.id === 2)" class="text-center mb-3">
            <router-link class="btn btn-outline-danger btn-sm" to="/about">Xem chi tiết</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const items = [
  {
    id: 1,
    title: 'Lịch sử hình thành',
    content: `
      Ngày 01/09/2005: Tổ Ngoại ngữ được hình thành với 4 thành viên.<br>
      Ngày 01/09/2008: Khoa Ngoại ngữ chính thức thành lập với 11 thành viên.<br>
      Từ 2008 đến nay: Khoa không ngừng phát triển về quy mô và chất lượng đào tạo.
    `
  },
  {
    id: 2,
    title: 'Cơ cấu nhân sự',
    content: `
      <strong>*Quản lý khoa:</strong><br>
      Trưởng khoa: Th.S Nguyễn Thanh Xuân<br>
      Phó trưởng khoa: Th.S Trần Thị Hồng Thi<br>
      Tổ trưởng tổ Anh văn chuyên ngành: Th.S Nguyễn Thị Bảo Ngọc<br>
      Tổ trưởng tổ Anh văn căn bản: Th.S Vũ Hoàng Giang<br>
      Giáo vụ khoa: Th.S Nguyễn Văn Thư<br>
    `
  }
];

const openIndex = ref(null);

function toggleCard(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

const gradientStyle = {
  background: 'linear-gradient(to bottom, #f44336, white)',
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 1000px;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
