<template>
  <div class="main-container">
    <HeaderWeb />
    <BannerSection class="animated-section" />
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
import BannerSection from '../components/BannerSection.vue';
import HinhNoiBat from '../components/TinNoiBat.vue';
import VideoHT from '@/components/VideoHT.vue';
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
/* 1. Reset */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f5f7fa;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.8s ease forwards;
}

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

.animated-section:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.15);
}

</style>
