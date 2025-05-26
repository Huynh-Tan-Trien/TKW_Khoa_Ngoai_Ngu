<template>
  <HeaderWeb />
  <BannerSection />
  <div class="container my-5">

    <!-- Tiêu đề lịch sử hình thành và phát triển -->
    <div class="text-center mb-4">
      <h2 class="text-danger fw-bold">LỊCH SỬ HÌNH THÀNH VÀ PHÁT TRIỂN</h2>
    </div>

    <!-- Div chứa hình ảnh chữ nhật -->
    <div class="image-container text-center my-4">
      <img class="rounded shadow-lg" src="https://www.kthcm.edu.vn/wp-content/uploads/2023/10/Untitled-5.jpg" alt="About Image" width="700" height="400" />
    </div>

     <!-- Nội dung giới thiệu trường -->
     <p>
      Trường Cao đẳng Kinh tế Thành phố Hồ Chí Minh (tên giao dịch tiếng Anh: Ho Chi Minh City College of Economics)...
    </p>

    <!-- Danh sách các trường học -->
    <ul class="list-unstyled">
      <li>- Trung học Tài chính</li>
      <li>- Trung học Kế hoạch</li>
      <li>- Trung học Thương nghiệp</li>
      <li>- Trung học Lao động – Tiền lương</li>
    </ul>

    <!-- Tiêu đề thông tin về trường -->
    <div class="text-danger fw-bold">
      <h4>TRƯỜNG CAO ĐẲNG KINH TẾ THÀNH PHỐ HỒ CHÍ MINH</h4>
    </div>

    <!-- Thông tin về tên trường -->
    <p><strong>Tên tiếng Anh:</strong> HOCHIMINH CITY COLLEGE OF ECONOMICS</p>
    <p><strong>Tên viết tắt:</strong> HCE</p>
    <p><strong>Trụ sở:</strong> 33 Vĩnh Viễn, Phường 2, Quận 10, TP.HCM</p>

    <!-- Cột mốc lịch sử -->
    <div class="text-center text-danger fw-bold mt-5">
      <h3>NHỮNG CỘT MỐC LỊCH SỬ QUAN TRỌNG</h3>
    </div>

    <p>15/09/1989: Trường Trung học Kinh tế Thành phố Hồ Chí Minh được thành lập...</p>
    <p>03/02/2005: Trường được nâng cấp lên thành Trường Cao đẳng...</p>
    <p>07/03/2005: Cơ quan chủ quản của Trường là Sở Giáo dục và Đào tạo TP.HCM...</p>

    <!-- Vài nét nổi bật trong công cuộc hình thành và phát triển -->
    <div class="text-start text-danger fw-bold mt-4">
      <h5>Vài nét nổi bật trong công cuộc hình thành và phát triển:</h5>
    </div>
    <p>Trường không ngừng nâng cao chất lượng đào tạo...</p>

    <!-- Hoạt động của nhà trường -->
    <div class="text-center text-danger fw-bold mt-5">
      <h3>HOẠT ĐỘNG CỦA NHÀ TRƯỜNG</h3>
    </div>

    <h3 class="text-start text-danger mt-3">Về đào tạo</h3>
    <p>Trường triển khai 26 ngành đào tạo, trong đó có 18 ngành Cao đẳng...</p>

    <h3 class="text-start text-danger mt-3">Về hợp tác</h3>
    <p>Trường đã xây dựng hệ thống các đối tác chiến lược trong và ngoài nước...</p>

    <h3 class="text-start text-danger mt-3">Về chiến lược</h3>
    <p>Trường đẩy mạnh hợp tác quốc tế, giao lưu sinh viên với các quốc gia khác...</p>
  </div>
  <FooterWeb />
</template>

<script setup>
import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
import BannerSection from '@/components/BannerSection.vue';
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.text-danger {
  color: #d9534f;
}

.fw-bold {
  font-weight: bold;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.image-container img {
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-container img:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

ul {
  list-style-type: none;
  padding-left: 0;
}

ul li {
  margin-bottom: 5px;
}

h3, h4, h5 {
  margin-top: 20px;
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}

.text-start {
  text-align: left;
}

.text-center {
  text-align: center;
}

.mt-4, .mt-5 {
  margin-top: 1.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
