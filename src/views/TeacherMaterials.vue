<template>
  <HeaderWeb />
  <BannerSection />

  <div class="teacher-materials">
    <h2>📂 Danh sách tài liệu đã đăng</h2>
    <ul>
      <li v-for="(doc, index) in documents" :key="index" class="doc-item">
        <div class="flex items-center gap-2">
          <span v-if="!editing[index]">{{ doc.name }}</span>
          <input
            v-else
            v-model="editedNames[index]"
            class="edit-input"
          />
        </div>

        <div class="actions">
          <a :href="doc.url" download target="_blank" class="download-btn">Tải xuống</a>

          <button @click="startEdit(index)" v-if="!editing[index]">✏️</button>
          <button @click="saveEdit(index)" v-if="editing[index]">💾</button>
          <button @click="cancelEdit(index)" v-if="editing[index]">❌</button>

          <button @click="deleteDoc(index)">🗑️</button>
        </div>
      </li>
    </ul>
  </div>

  <FooterWeb />
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useDocumentStore } from '@/store/documentStore';
import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
import BannerSection from '@/components/BannerSection.vue';

const store = useDocumentStore();
const documents = store.documents;

const editing = reactive({});
const editedNames = reactive({});

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};
const saveEdit = (index) => {
  store.documents[index].name = editedNames[index];
  editing[index] = false;
};

const deleteDoc = (index) => {
  store.documents.splice(index, 1);
};

const selectedFile = ref(null);
const newDocName = ref('');

const uploadFile = () => {
  if (!selectedFile.value || !newDocName.value) {
    alert('Vui lòng nhập tên và chọn file.');
    return;
  }
  const fakeURL = URL.createObjectURL(selectedFile.value);
  store.addDocument(newDocName.value, fakeURL);

  selectedFile.value = null;
  newDocName.value = '';
  alert('Tài liệu đã được đăng (giả lập).');
};

const startEdit = (index) => {
  editing[index] = true;
  editedNames[index] = documents.value[index].name;
};

const cancelEdit = (index) => {
  editing[index] = false;
};


</script>

<style scoped>
.teacher-materials {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

input[type="file"],
input[type="text"] {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 400px;
}

button {
  margin-right: 8px;
  padding: 8px 12px;
  background-color: #00b147;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #01953d;
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
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.edit-input {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 250px;
}

.actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.download-btn {
  background: #007bff;
  padding: 6px 10px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.3s ease;
}

.download-btn:hover {
  background: #0056b3;
}
</style>
