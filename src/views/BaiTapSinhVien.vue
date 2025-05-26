<template>
  <HeaderWeb/>
  <div class="student-assignments">
    <h2>Bài tập</h2>
    <div
      v-for="assignment in assignments"
      :key="assignment.id"
      class="assignment-item"
    >
      <h3>{{ assignment.title }}</h3>
      <p>Mô tả: {{ assignment.description }}</p>
      <button @click="doAssignment(assignment.id)">Làm bài</button>
    </div>
  </div>
  <FooterWeb/>
</template>

<script setup>
import { ref } from 'vue';
import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
const assignments = ref([
  {
    id: 1,
    title: 'Bài tập Cơ bản',
    description: 'Ôn tập kiến thức cơ bản',
  },
  {
    id: 2,
    title: 'Bài tập Nâng cao',
    description: 'Bài tập nâng cao',
  },
]);

const doAssignment = (assignmentId) => {
  alert(`Bắt đầu làm bài tập có ID: ${assignmentId}`);
};
</script>

<style scoped>
.student-assignments {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.assignment-item {
  background: #f5f7fa;
  padding: 15px 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
}

button {
  padding: 8px 12px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #0056b3;
}
</style>
