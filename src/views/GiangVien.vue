<script setup>
import { ref } from 'vue';
import { useDocumentStore } from '@/store/documentStore';

import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
import BannerSection from '@/components/BannerSection.vue';

const store = useDocumentStore();
const documents = ref(['']);
const newDoc = ref({ name: '', file: null });

const handleFileUpload = (e) => {
  newDoc.value.file = e.target.files[0];
};

const uploadDocument = () => {
  if (!newDoc.value.name || !newDoc.value.file) return;

  const fakeURL = URL.createObjectURL(newDoc.value.file);
  store.addDocument(newDoc.value.name, fakeURL);
  documents.value.push({
    name: newDoc.value.name,
    url: fakeURL
  });
  alert("Tài liệu đã được đăng");

  newDoc.value.name = '';
  newDoc.value.file = null;
};
</script>

<template>
  <HeaderWeb/>
  <BannerSection/>
  <div class="dashboard">
    <h1>Giảng viên đăng tài liệu ở đây</h1>
    <form @submit.prevent="uploadDocument">
      <input type="text" v-model="newDoc.name" placeholder="Tên tài liệu" required />
      <input type="file" @change="handleFileUpload" required />
      <button type="submit">Đăng tài liệu</button>
    </form>

    <h2>📂 Danh sách tài liệu đã đăng</h2>
    <ul>
      <li v-for="doc in documents" :key="doc.name" class="doc-item">
        <span>{{ doc.name }}</span>
        <div v-if="doc.name"><a :href="doc.url" download target="_blank" class="download-btn">Tải xuống</a></div>
      </li>
    </ul>
  </div>
  <FooterWeb/>
</template>

<style scoped>
.dashboard {
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

form {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
}

form input[type="text"],
form input[type="file"] {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

form button {
  padding: 10px 20px;
  background: #00b147;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

form button:hover {
  background: #01953d;
}

h1,
h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

.doc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.doc-item:hover {
  transform: translateY(-2px);
}

.doc-item span {
  font-weight: 500;
  font-size: 1.05rem;
  color: #333;
}

.download-btn {
  background: #007bff;
  color: white;
  padding: 8px 14px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 600;
  transition: background 0.3s ease;
}

.download-btn:hover {
  background: #0056b3;
}
</style>
