<template>
  <div class="main-container">
    <HeaderWeb />
    <BannerSection class="animated-section" />
    <AccordionList class="animated-section" />
    <HinhNoiBat class="animated-section" />
    <VideoHT class="animated-section" />
    <GameHT class="animated-section" />
    <Question class="animated-section" />
    <FooterWeb />
  </div>
</template>

<script setup>
import HeaderWeb from '../components/HeaderWeb.vue';
import FooterWeb from '../components/FooterWeb.vue';
import AccordionList from '../components/AccordionList.vue';
import BannerSection from '../components/BannerSection.vue';
import HinhNoiBat from '../components/TinNoiBat.vue';
import VideoHT from "@/components/VideoHT.vue";
import GameHT from '@/components/GameHT.vue';
import Question from '@/components/Question.vue';

import { onMounted } from 'vue';

onMounted(() => {
  const animatedSections = document.querySelectorAll('.animated-section');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  animatedSections.forEach((el) => observer.observe(el));
});
</script>

<style scoped>
.main-container {
  background-color: #f5f7fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  padding-top: 20px;
  padding-bottom: 40px;
}

/* Mặc định ẩn + vị trí thấp hơn */
.animated-section {
  margin: 2rem auto;
  padding: 2rem 1.5rem;
  max-width: 1140px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(40px);
  opacity: 0;
  transition: transform 0.4s ease, box-shadow 0.3s ease;
  cursor: default;
}

/* Khi element vào viewport sẽ thêm class này */
.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.8s ease forwards;
}

/* Hover nổi lên */
.animated-section:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
}

/* Keyframes cho animation fade in và slide lên */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Giúp section có padding dễ đọc */
section {
  padding-top: 40px;
  padding-bottom: 40px;
}

/* Bootstrap utilities nếu cần */
@media (max-width: 768px) {
  .animated-section {
    padding: 1.5rem 1rem;
    margin: 1.5rem auto;
  }
}
</style>