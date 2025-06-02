<template>
  <section class="py-5 text-center" style="background-color: #56a0b3; color: white;">
    <div class="container">
      <div class="bg-white text-dark p-3 rounded shadow-sm d-inline-block">
        <h2 class="mb-0">KHOA NGOẠI NGỮ</h2>
      </div>
      <p class="mt-4 fs-5 fw-semibold">
        Khoa Ngoại ngữ là một khoa chuyên môn độc lập, đào tạo ngành tiếng Anh và ngành tiếng Hàn.
        Nhiệm vụ đào tạo của khoa là hướng đến chuẩn hóa ngoại ngữ cho toàn bộ sinh viên nhà trường.
      </p>

      <div class="image-slider">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
          :class="{ active: index === currentIndex }"
        >
          <img :src="image" alt="Slideshow Image" class="slider-image">
        </div>
        <button class="btn btn-success mt-3 slider-btn" @click="handleClick">
          Tìm hiểu thêm
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const images = ref([
  "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/501302284_1172702101327614_8626857202518232125_n.jpg?stp=dst-jpg_s851x315_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=2utVoQadaY4Q7kNvwGBLAzb&_nc_oc=AdmUkVITrldB8DsBtOHW2iDty07pYkxdNV6yuLweeO1QTKMsiYMZ8LOh0mV5LQ5gxLA&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=F7KRk22EMJf4LkZPHCw0UQ&oh=00_AfLOhC3QKKVZa4-5k92W-YsmLrGLsolDkChemUnh2krfEQ&oe=6841B269",
  "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/495086524_1158129249451566_7894997203560858297_n.jpg?stp=dst-jpg_s851x315_tt6&_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_ohc=0wZAwAjT064Q7kNvwFsKE-_&_nc_oc=Adm8uUIicaCVoYmFzzHQkcJuaSK56Gg4e4Sekw27lOU1Ccbn8wZhs2LTIG3tfxjM6Sc&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=F7KRk22EMJf4LkZPHCw0UQ&oh=00_AfJvBk6EVmbXJaxnTpMXQJztKYH08-KQVUwcsDOP6cSqHQ&oe=6841CD19",
  "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/501272023_1172605764670581_3533172925340163977_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LnlqaCOp310Q7kNvwFfbvaP&_nc_oc=AdlQd4cI_6js4btw5hvcjl9Jphet1lm6xm-UC-H_TZIMaMhXoucNYaFexeQv_Q1u3Pc&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=e7_vCfm7gT0ng_OUIDA__g&oh=00_AfLwW9to7RySX8QQPSK1pM8mlHO69pufLBOCLbpzvZ4N1Q&oe=6841D62C"
])

const currentIndex = ref(0)

onMounted(() => {
  setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length
  }, 5000)
})

function handleClick() {
  alert('Chức năng "Tìm hiểu thêm" đang được phát triển!')
}
</script>

<style scoped>
.container {
  cursor: pointer;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  animation: fadeIn 1s ease-out;
}

.container:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.image-slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 400px;
  overflow: hidden;
  margin: 20px auto 0;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.image-container.active {
  opacity: 1;
  z-index: 2;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.slider-btn {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background-color: #28a745;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.slider-btn:hover {
  background-color: #218838;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.bg-gradient-inner {
  background: linear-gradient(to right, #f0f9e3, rgb(175, 255, 129));
}
.container {
  animation: fadeIn 1s ease-out;
}

.bg-section {
  background: linear-gradient(135deg, #56a0b3, #4e84a0);
  color: white;
}

.content-box {
  background: white;
  color: #333;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content-box:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.image-slider {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 420px;
  overflow: hidden;
  margin: 30px auto 0;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  animation: fadeInUp 1s ease forwards;
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.image-container.active {
  opacity: 1;
  z-index: 2;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.5s ease;
}

.image-container:hover .slider-image {
  transform: scale(1.02);
}

.slider-btn {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  padding: 14px 28px;
  font-size: 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, #28a745, #218838);
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease, transform 0.2s ease;
}

.slider-btn:hover {
  transform: translateX(-50%) scale(1.05);
  background: linear-gradient(135deg, #218838, #1e7e34);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
