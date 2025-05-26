<template>
  <HeaderWeb />
  <div class="tuyensinh-container">
    <div class="section-output animated-section">
      <div class="overlay"></div>
      <div class="content-box">
        <h2>TIÊU CHUẨN ĐẦU RA SAU KHI TỐT NGHIỆP</h2>
        <div class="columns">
          <ul class="info-list">
            <li>
              <span class="index">1</span>
              <strong>Kiến thức:</strong>
              <ul class="sub-list">
                <li>Trình bày kiến thức về chính trị, văn hóa, xã hội, đáp ứng yêu cầu nghề nghiệp và hoạt động xã hội thuộc lĩnh vực chuyên môn.</li>
                <li>Vận dụng được kiến thức nền tảng về ngôn ngữ Anh, Trung, Hàn vào công việc.</li>
                <li>Áp dụng kiến thức chuyên môn & kỹ năng giao tiếp cho công việc như: dịch thuật, hành chính, xuất nhập khẩu, giảng dạy.</li>
              </ul>
            </li>
            <li>
              <span class="index">2</span>
              <strong>Kỹ năng:</strong>
              <ul class="sub-list">
                <li>Sử dụng thành thạo tiếng Anh, Trung, Hàn trong nghe, nói, đọc, viết.</li>
                <li>Thực hành tốt dịch thuật, hành chính văn phòng, v.v.</li>
                <li>Có kỹ năng mềm & bổ trợ công việc.</li>
              </ul>
            </li>
          </ul>

          <ul class="info-list">
            <li>
              <span class="index">3</span>
              <strong>Năng lực tự chủ và trách nhiệm:</strong>
              <ul class="sub-list">
                <li>Đạo đức công dân, phẩm chất tốt, đáp ứng yêu cầu tuyển dụng.</li>
                <li>Hành vi ứng xử chuyên nghiệp.</li>
              </ul>
            </li>
            <li>
              <span class="index">4</span>
              <strong>Vị trí và việc làm sau tốt nghiệp:</strong>
              <ul class="sub-list">
                <li>Nhân viên dịch thuật</li>
                <li>Nhân viên hành chính văn phòng</li>
                <li>Nhân viên xuất nhập khẩu</li>
                <li>Giáo viên ngôn ngữ sơ cấp</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <FooterWeb />
</template>

<script setup>
import HeaderWeb from '../components/HeaderWeb.vue'
import FooterWeb from '../components/FooterWeb.vue'

import { onMounted } from 'vue';

onMounted(() => {
  const animatedSections = document.querySelectorAll('.animated-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedSections.forEach(el => observer.observe(el));
});
</script>

<style scoped>
.tuyensinh-container {
  padding: 0;
  margin: 0;
}

.section-output {
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 60px 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  transition: box-shadow 0.3s ease;
}

/* Animation mặc định: ẩn và dịch xuống */
.animated-section {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Khi vào viewport */
.fade-in-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hover nâng bóng */
.section-output:hover {
  box-shadow: 0 12px 40px rgba(30, 144, 255, 0.3);
}

.overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
  border-radius: 16px;
}

.content-box {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.95);
  padding: 40px 50px;
  border-radius: 16px;
  max-width: 1100px;
  width: 100%;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.22);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  transition: transform 0.3s ease;
}

/* Content hover nhẹ nâng lên */
.content-box:hover {
  transform: translateY(-6px);
}

h2 {
  text-align: center;
  color: #b22222;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 40px;
  letter-spacing: 1.2px;
}

.columns {
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
}

.info-list {
  flex: 1;
  list-style: none;
  padding-left: 0;
}

.info-list > li {
  margin-bottom: 30px;
  position: relative;
  padding-left: 50px;
  font-size: 1rem;
  line-height: 1.5;
}

.index {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #1e90ff;
  color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(30, 144, 255, 0.4);
}

.sub-list {
  margin-top: 12px;
  padding-left: 24px;
  list-style-type: circle;
  color: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .columns {
    flex-direction: column;
    gap: 25px;
  }

  .content-box {
    padding: 25px 20px;
  }

  h2 {
    font-size: 24px;
  }

  .info-list > li {
    padding-left: 40px;
  }

  .index {
    width: 26px;
    height: 26px;
    font-size: 14px;
  }
}
</style>
