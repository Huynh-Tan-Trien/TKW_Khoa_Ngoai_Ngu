<template>
    <div class="w-full p-4">
      <h2 class="text-xl font-bold mb-4 text-center">Tài liệu học tập</h2>
  
      <!-- Grid 2 hàng (tự động wrap nếu ít hơn 6 video) -->
      <div class="video-grid">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="video-card"
        >
          <img
            :src="video.image"
            alt="Video thumbnail"
            class="thumb"
          />
          <h3 class="text-sm font-semibold mb-1">Video {{ index + 1 }}</h3>
          <p class="text-xs text-gray-600 mb-2">{{ video.description }}</p>
          <a
            :href="video.link"
            target="_blank"
            class="text-blue-500 text-sm hover:underline"
          >
            ▶ Xem video
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const videos = [
    {
      description: "Tài liệu học tiếng anh 1.",
      link: "https://youtu.be/VdWyHp2fees",
      image: "https://img.youtube.com/vi/VdWyHp2fees/mqdefault.jpg",
    },
    {
      description: "Tài liệu học tiếng anh 2.",
      link: "https://youtu.be/V89sRjoTNrQ",
      image: "https://img.youtube.com/vi/V89sRjoTNrQ/mqdefault.jpg",
    },
    {
      description: "Bí quyết nói tiếng Anh lưu loát.",
      link: "https://youtu.be/cFHhtoNZ0iw",
      image: "https://img.youtube.com/vi/cFHhtoNZ0iw/mqdefault.jpg",
    },
    {
      description: "Học chữ cái tiếng Hàn.",
      link: "https://youtu.be/EP-LQ3Vtmk4",
      image: "https://img.youtube.com/vi/EP-LQ3Vtmk4/mqdefault.jpg",
    },
    {
      description: "Ngữ pháp từ cơ bản đến nâng cao.",
      link: "https://youtu.be/9ef9dWyDNwY",
      image: "https://img.youtube.com/vi/9ef9dWyDNwY/mqdefault.jpg",
    },
  ];
  </script>
  
  <style scoped>
  /* Container chính */
  .video-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 cột */
    gap: 20px; /* Khoảng cách giữa các video */
    grid-template-rows: auto auto; /* Hai hàng tự động */
    margin-top: 10px;
  }
  
  .video-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding: 16px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .video-card:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  
  .thumb {
    width: 100%;
    height: 130px;
    object-fit: cover;
    border-radius: 8px;
  }
  
  /* Thêm hover cho liên kết */
  a:hover {
    text-decoration: underline;
  }
  </style>
  