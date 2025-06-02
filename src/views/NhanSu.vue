<template>
    <HeaderWeb/>
    <div class="container my-4">
      <div class="card">
        <div class="card-header bg-primary text-white text-center">
          <h1 class="h4 mb-0">Cơ Cấu Tổ Chức Khoa Ngoại Ngữ</h1>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li v-for="item in Infor" :key="item.id" class="list-group-item">
                <strong>{{ item.title }}</strong>
                <!-- Kiểm tra nếu có cấp con -->
                <ul v-if="item.children && item.children.length" class="list-group mt-2 ms-4">
                    <li v-for="child in item.children" :key="child.id" class="list-group-item py-1">
                        <div v-if="child.id==11">
                                <router-link to="/DSGV/4">Trưởng Khoa: Th.S Nguyễn Thanh Xuân</router-link>
                        </div>
                        <div v-if="child.id==12">
                                <router-link to="/DSGV/9">Phó trưởng Khoa: Th.S Trần Thị Hồng Thi</router-link>
                        </div>
                        <div v-if="child.id==13">
                          <div class="accordion-wrapper">
                            <details class="accordion" open>
                              <summary class="accordion-title">Tổ Anh văn căn bản</summary>
                              <ul>
                                <li v-for="gv in toCanBan" :key="gv.id">
                                  <RouterLink :to="gv.path">{{ gv.hoTen }}</RouterLink>
                                </li>
                              </ul>
                            </details>
                        
                            <details class="accordion">
                              <summary class="accordion-title">Tổ Anh văn chuyên ngành</summary>
                              <ul>
                                <li v-for="gv in toChuyenNganh" :key="gv.id">
                                  <RouterLink :to="gv.path">{{ gv.hoTen }}</RouterLink>
                                </li>
                              </ul>
                            </details>
                          </div>
                        </div>
                        {{ child.title }}
                    </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <FooterWeb/>
</template>

<script setup>
import { ref } from 'vue';
import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
  
const toCanBan = [
    { id:6, hoTen: 'Th.S Vũ Hoàng Giang', path: '/DSGV/6' },
    { id:4, hoTen: 'Th.S Nguyễn Thanh Xuân', path: '/DSGV/4' },
    { id:8, hoTen: 'Th.S Trần Đình Khoa', path: '/DSGV/8' },
    { id:10, hoTen: 'Th.S Trần Thị Oanh Đào', path: '/DSGV/10' },
    { id:3, hoTen: 'Nguyễn Đình Thao', path: '/DSGV/3' },
    { id:7, hoTen: 'Nguyễn Thị Cẩm Tiên', path: '/DSGV/7' }
  ]
  
const toChuyenNganh = [
    { id:5, hoTen: 'Th.S Nguyễn Thị Bảo Ngọc', path: '/DSGV/5' },
    { id:2, hoTen: 'Th.S Đỗ Ngọc Quỳnh', path: '/DSGV/2' },
    { id:9, hoTen: 'Th.S Trần Thị Hồng Thi', path: '/DSGV/9' },
    { id:1, hoTen: 'Bùi Thị Thanh Thảo', path: '/DSGV/1' },
    { id:11, hoTen: 'Võ Hoàng Nhân', path: '/DSGV/11' }
  ]
  // Dữ liệu cơ cấu tổ chức mẫu
  const Infor = ref([
    {
      id: 1,
      title: "CƠ CẤU NHÂN SỰ HIỆN TẠI",
      children: [
        { id: 11, },
        { id: 12, },
        { id: 13, },
        { id: 14, title: "Giáo vụ khoa: Th.S Nguyễn Vân Thư", }
      ]
    },
    {
      id: 2,
      title: "DẤU ẤN VÀ THÀNH TỰU",
      children: [
        { id: 21, title: "Từ khi thành lập vào năm 2008, Khoa Ngoại ngữ luôn chú trọng vào việc phát triển chất lượng đội ngũ nhà giáo. 100% nhà giáo đều đạt chuẩn chuyên môn, nghiệp vụ theo quy định và thường xuyên chủ động học tập, bồi dưỡng nâng cao trình độ chuyên môn và cập nhật phương pháp giảng dạy hiện đại. Đội ngũ nhà giáo khoa Ngoại ngữ liên tục nhiều năm đạt giải cao trong Hội thi giáo viên dạy giỏi cấp trường, cấp thành phố, cấp toàn quốc: 02 giải nhất cấp thành phố, 01 giải nhất cấp toàn quốc." },
        { id: 22, title: "Sinh viên khoa Ngoại ngữ luôn thể hiện tính năng động, tự tin, sáng tạo trong các hoạt động phong trào và là lực lượng nòng cốt trong các hoạt động trao đổi học thuật và giao lưu quốc tế của nhà trường. Sinh viên tốt nghiệp ngành tiếng Anh có thể làm việc ở nhiều lĩnh vực nghề nghiệp khác nhau và được các đơn vị sử dụng lao động đánh giá cao." },
        { id: 23, title: "Tập thể khoa Ngoại ngữ liên tục nhiều năm đạt tập thể Lao động tiên tiến, tập thể Lao động xuất sắc và nhiều thành tích khen thưởng khác." }
      ]
    },
    {
      id: 3,
      title: "VĂN PHÒNG KHOA NGOẠI NGỮ",
      children: [
        {id:31,title:"Địa chỉ: 33 Vĩnh Viễn, Phường 2, Quận 10, TP.HCM"},
        {id:32,title:"E-mail: khoangoaingu@kthcm.edu.vn"},
        {id:32,title:"Giờ làm việc: từ thứ Hai đến thứ Sáu."}
      ]
    }
  ]);
</script>
<style scoped>

</style>
