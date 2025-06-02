<template>
  <div class="app-container bg-gradient-primary d-flex flex-column min-vh-100">
    <header class="bg-light p-2 shadow-sm w-100">
      <!-- Header nội dung -->
    </header>

    <main class="flex-grow-1 w-100">
      <router-view />
    </main>

    <footer class="bg-secondary text-light text-center py-2 w-100">
      <p class="mb-0">&copy; 2025 Nhóm 1</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
/* --- 1. CSS Reset & Base Styles --- */
/* Đảm bảo HTML và Body không có margin/padding mặc định và chiếm toàn bộ không gian */
html, body {
    margin: 0;
    padding: 0;
    width: 100%; /* Đảm bảo chiều rộng đầy đủ */
    height: 100%; /* Đảm bảo chiều cao đầy đủ để min-vh-100 hoạt động */
    overflow-x: hidden; /* Tránh thanh cuộn ngang không mong muốn */
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Font cơ bản cho toàn trang */
    background: #f8f9fa; /* Màu nền nhẹ cho toàn bộ trang */
    color: #333; /* Màu chữ cơ bản */
}

/* Áp dụng box-sizing cho mọi phần tử. RẤT QUAN TRỌNG để kiểm soát kích thước chính xác */
*, *::before, *::after {
    box-sizing: border-box;
}

/* --- 2. Styles cho App Container và Gradient --- */
.app-container {
    /* Các class Bootstrap d-flex flex-column min-vh-100 đã xử lý layout chính */
    /* min-height: 100vh; đã được quản lý bởi class Bootstrap min-vh-100, không cần lặp lại */
    /* margin và padding đã được xử lý ở html, body */
    /* Đặt gradient tại đây, loại bỏ các khai báo trùng lặp */
    background: linear-gradient(to bottom, #e0f2f7, #81d4fa);
}

/* --- 3. Header Styling --- */
header {
    /* Các class Bootstrap bg-light p-2 shadow-sm w-100 đã cung cấp phần lớn styling */
    /* Đảm bảo không có margin/padding ngoài các class Bootstrap */
    margin: 0;
    /* padding-top/bottom đã được Bootstrap's p-2 cung cấp (1rem trên dưới) */
    /* Có thể thêm z-index nếu muốn header luôn hiển thị trên các phần tử khác */
    /* position: sticky; top: 0; z-index: 1000; (Nếu muốn header cố định khi cuộn) */
}

header h1 {
    font-weight: 700;
    letter-spacing: 1.2px;
    margin-bottom: 0; 
}

/* --- 4. Main Content Styling --- */
main {
    flex-grow: 10; 
    width: 200%; 
}

/* --- 5. Footer Styling --- */
footer {
    font-size: 0.9rem;
    letter-spacing: 0.05em;
    margin-top: auto; 
}

footer p.mb-0 {
    margin-bottom: 0 !important; 
}


.container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 3rem; /* Thêm padding ngang cho container để nội dung không chạm biên */
    padding-right: 1rem;
}

/* Bài viết card */
.post-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.post-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(30, 144, 255, 0.3);
}

/* Animation fade-in + dịch lên */
.animated-fade {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Các styles khác của bạn */
.text-danger {
    color: #d9534f;
}

.fw-bold {
    font-weight: bold;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.image-container img {
    border-radius: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container img:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.text-danger {
  color: #d9534f;
}

.fw-bold {
  font-weight: bold;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.image-container img {
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 5px;
}

h3, h4, h5 {
  margin-top: 20px;
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}

.text-start {
  text-align: left;
}

.text-center {
  text-align: center;
}

.mt-4, .mt-5 {
  margin-top: 1.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>