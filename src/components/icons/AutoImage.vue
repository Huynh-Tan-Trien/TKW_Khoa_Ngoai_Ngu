<template>
  <div class="container my-4">
    <div class="card shadow-sm border-0">
      <img :src="imageUrl" class="card-img-top img-fluid rounded" alt="Daily Image">
      <div class="card-body text-center">
        <h5 class="card-title">Ảnh trong ngày</h5>
        <p class="card-text text-muted">Tự động cập nhật mỗi ngày</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ''
    };
  },
  created() {
    this.updateImage();
  },
  methods: {
    updateImage() {
      // Cách 1: Lấy ảnh ngẫu nhiên mới mỗi ngày từ Unsplash
      const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      this.imageUrl = `https://source.unsplash.com/featured/800x400?sig=${date}`; // ảnh thay đổi theo ngày
    }
  }
};
</script>

<style scoped>
.card-img-top {
  max-height: 400px;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.card-img-top:hover {
  transform: scale(1.03);
}
</style>
