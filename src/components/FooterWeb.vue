<template>
    <footer class="bg-footer text-white py-5">
      <div class="container">
        <div class="row">
          <!-- Thông tin liên hệ -->
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Kết nối với chúng tôi</h5>
            <p>
              Fanpage: <a href="#" class="text-warning text-decoration-none">Facebook</a><br />
              Email: <a href="mailto:hce@kthcm.edu.vn" class="text-warning text-decoration-none">hce@kthcm.edu.vn</a><br />
              Địa chỉ: 33, Đường Vĩnh Viễn, Quận 10, TP.HCM<br />
              Website: <a href="https://www.kthcm.edu.vn/" target="_blank" class="text-warning text-decoration-none">hcewebsite.com</a>
            </p>
          </div>
  
          <!-- Form liên hệ -->
          <div class="col-md-4 mb-4 mb-md-0">
            <h5 class="mb-3">Đăng ký liên hệ</h5>
            <form @submit.prevent="handleSubmit">
              <div class="mb-2">
                <input type="text" v-model="name" class="form-control" placeholder="Họ và Tên" required />
              </div>
              <div class="mb-2">
                <input type="email" v-model="email" class="form-control" placeholder="Email" required />
              </div>
              <div class="mb-2">
                <textarea v-model="message" class="form-control" rows="2" placeholder="Nội dung liên hệ" required></textarea>
              </div>
              <button type="submit" class="btn w-100 fw-bold" style="background-color: #f1c40f;">Gửi</button>
            </form>
          </div>
  
          <!-- Bản đồ -->
          <div class="col-md-4">
            <h5 class="mb-3">Bản đồ</h5>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.733156041873!2d106.66822427504174!3d10.752535859682371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ecfded4133d%3A0x77ce4976ed62c80e!2zVHLGsOG7nW5nIENhbyDEkMOgbmcgS2luaCB0w6ogVGjDoG5oIHBob8OgIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1712293423454!5m2!1svi!2s"
              width="100%" height="200" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const name = ref('')
  const email = ref('')
  const message = ref('')
  
  function handleSubmit() {
    alert(`Cảm ơn bạn, ${name.value}! Chúng tôi sẽ liên hệ lại sớm.`)
    name.value = ''
    email.value = ''
    message.value = ''
  }
  </script>
  
  <style scoped>
  .bg-footer {
    background-color: #772c3a; /* Màu đỏ đậm giống trong hình */
  }
  </style>
  