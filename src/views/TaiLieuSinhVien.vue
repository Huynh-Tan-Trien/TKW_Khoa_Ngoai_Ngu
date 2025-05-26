<script setup>
import { useDocumentStore } from '@/store/documentStore';
import { computed } from 'vue';

import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
import BannerSection from '@/components/BannerSection.vue';

const store = useDocumentStore();
const documents = computed(() => store.getDocuments());

const videos = [
  {
    title: 'Ôn tập Unit 1',
    thumbnail: 'https://i.ytimg.com/vi/XAuJeMh1KGs/maxresdefault.jpg',
    link: 'https://youtu.be/XAuJeMh1KGs?si=mKUyFAVosHrIRQxf',
  },
  {
    title: 'Ôn tập Unit 2',
    thumbnail: 'https://i.ytimg.com/vi/Y37TGc_boFc/maxresdefault.jpg',
    link: 'https://youtu.be/Y37TGc_boFc?si=sqmQ5mCpP58jc1-1',
  },
  {
    title: 'Ôn tập Unit 3',
    thumbnail: 'https://i.ytimg.com/vi/Hos3Rhl0ryU/maxresdefault.jpg',
    link: 'https://youtu.be/Hos3Rhl0ryU?si=Tytlej1aJDA9VIjb',
  },
  {
    title: 'Ôn tập Unit 4',
    thumbnail: 'https://i.ytimg.com/vi/ITqSyw0zt8A/maxresdefault.jpg',
    link: 'https://youtu.be/ITqSyw0zt8A?si=jdhHQyw-_mY4ZDW2',
  },
];
</script>

<template>
  <HeaderWeb />
  <BannerSection />
  <div class="student-dashboard">
    <h1 class="title">📚 Tài liệu dành cho sinh viên</h1>
    <ul class="doc-list">
      <li v-for="doc in documents" :key="doc.name" class="doc-card">
        <span class="doc-name">{{ doc.name }}</span>
        <a :href="doc.url" download target="_blank" class="download-btn">Tải xuống</a>
      </li>
    </ul>
  </div>
  <h2 class="text-center mt-5 mb-4">Link Youtube Tài Liệu ôn tập và ngữ pháp</h2>
    <div class="row g-4">
      <div class="col-md-6 col-lg-4" v-for="(video, index) in videos" :key="index">
        <div class="card h-100 shadow-sm">
          <img :src="video.thumbnail" class="card-img-top" alt="Thumbnail" />
          <div class="card-body">
            <h5 class="card-title">{{ video.title }}</h5>
            <a :href="video.link" class="btn btn-primary" target="_blank">Xem video</a>
          </div>
        </div>
      </div>
    </div>
  <FooterWeb />
</template>

<style scoped>
.student-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

.title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  color: #2c3e50;
}

.doc-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 20px;
}

.doc-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f7fa;
  padding: 15px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.doc-card:hover {
  transform: translateY(-2px);
}

.doc-name {
  font-weight: 500;
  color: #333;
  font-size: 1.1rem;
}

.download-btn {
  background-color: #00b147;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;
}

.download-btn:hover {
  background-color: #02963a;
}
</style>

