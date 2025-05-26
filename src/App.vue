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
.bg-gradient-primary {
  background: linear-gradient(to bottom, #e0f2f7, #81d4fa);
  margin: 0;
  padding: 0;
}

/* Reset padding/margin nếu có */
html, body {
  margin: 0;
  padding: 0;
}
.bg-gradient-primary {
  background: linear-gradient(to bottom, #e0f2f7, #81d4fa);
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

/* Reset padding/margin nếu có */
html, body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f8f9fa;
  color: #333;
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

/* Header */
header h1 {
  font-weight: 700;
  letter-spacing: 1.2px;
}

/* Footer */
footer {
  font-size: 0.9rem;
  letter-spacing: 0.05em;
}

/* Responsive */
@media (max-width: 768px) {
  main.container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
