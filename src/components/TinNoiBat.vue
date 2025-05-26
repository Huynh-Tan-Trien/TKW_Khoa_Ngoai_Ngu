<template>
  <div class="content" v-if="currentView === 'Home'">
      <h2>Một số hình ảnh nổi bật</h2>
      <img src="../assets/image1.png" class="image" width="400pt" alt="">
      <img src="../assets/image2.jpg" class="image" width="400pt" alt="">
      <img src="../assets/image5.png" class="image" width="400pt" alt="">
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  const currentView = ref('Home');
</script>

<style>
.content {
padding: 50px 40px;
text-align: center;
border-top: 2px solid #eee;
margin-top: 40px;
}

.content img {
height: 200px;
margin: 10px;
border-radius: 12px;
transition: transform 0.4s ease, box-shadow 0.4s ease;
cursor: pointer;
}

.content img:hover {
transform: scale(1.05);
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}
.image{
cursor: pointer;
transition: transform 0.3s ease, filter 0.3s ease;
}

.image :hover {
transform: scale(1.1);
filter: brightness(0.9);
}
</style>

