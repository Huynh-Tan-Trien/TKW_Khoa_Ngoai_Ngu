<template>
  <div>
    <!-- Bìa Đồ Án chia 2 phần -->
<div class="project-cover py-5 px-3 bg-light border mb-4"> 
  <div class="row">
    <!-- Phần Left -->
<div class="col-md-6 text-center">
  <h6 class="text-uppercase fw-bold mb-1">ỦY BAN NHÂN DÂN</h6>
  <h6 class="text-uppercase fw-bold mb-1">SỞ GIÁO DỤC VÀ ĐÀO TẠO</h6>
  <h6 class="mb-1 fw-semibold">TRƯỜNG CAO ĐẲNG KINH TẾ THÀNH PHỐ HỒ CHÍ MINH</h6>
  <h6 class="mb-1 fw-semibold text-decoration-underline fs-5" style="padding-left: 215px;">ĐỒ ÁN THIẾT KẾ WEB NÂNG CAO</h6>
</div>



    <!-- Phần Right -->
    <div class="col-md-6 text-center">
      <p class="mb-1 fw-bold">GIÁO VIÊN HƯỚNG DẪN:</p>
      <p class="mb-1 fst-italic">Phạm Đằng Phương</p>
      <p class="mb-1 fw-bold">SINH VIÊN THỰC HIỆN:</p>
      <p class="mb-1 fst-italic">Huỳnh Tuấn Phát - Nguyễn Tuấn Kiệt</p>
      <p class="mb-1 fst-italic">Nguyễn Phước Thảo Hương - Huỳnh Tấn Triển</p>
      <p class="mb-0">NHÓM 1</p>
    </div>

   
    <div class="col-md-12 text-center">

      <h6 class="text-uppercase fw-bold fs-3">KHOA NGOẠI NGỮ</h6> 
      <h6 class="text-uppercase">TRƯỜNG CAO ĐẲNG KINH TẾ TP.HCM</h6>
    </div>
  </div>
</div>


    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-white shadow-sm py-2 sticky-top">
      <div class="container">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="https://cdn.haitrieu.com/wp-content/uploads/2023/01/Logo-Truong-Cao-dang-Kinh-te-TP.HCM_.png" alt="Logo" class="me-2" />
        </a>
        <!-- Hamburger button -->
        <button class="btn d-lg-none" @click="toggleSidebar">
          ☰
        </button>
        <!-- Menu items (Desktop only) -->
        <ul v-if="isUserLoaded" class="navbar-nav mx-auto d-none d-lg-flex gap-4">
          <li v-for="(item, index) in filteredNavItems" :key="index"
            class="nav-item dropdown"
            @mouseenter="showDropdown(index)"
            @mouseleave="hideDropdown">
            <template v-if="item.to">
              <router-link class="nav-link fw-bold" :to="item.to" :class="{ active: isActive(item) }" @click="setActive(index)">
                {{ item.title }}
              </router-link>
            </template>
            <template v-else>
              <span class="nav-link fw-bold">{{ item.title }}</span>
            </template>

            <!-- Dropdown menu -->
            <ul
              v-if="item.children"
              class="dropdown-menu show"
              :style="{ display: dropdownIndex === index ? 'block' : 'none' }"
            >
              <li v-for="(child, idx) in item.children" :key="idx">
                <router-link v-if="child.to" class="dropdown-item" :to="child.to">
                  {{ child.name }}
                </router-link>
                <span v-else class="dropdown-item">{{ child.name }}</span>
              </li>
            </ul>
          </li>
        </ul>

        <!-- Search + icons -->
        <div class="d-flex align-items-center gap-2">
          <input class="form-control" placeholder="Tìm kiếm..." />
          <button class="btn btn-success">🔍</button>
          <Sign v-if="ShowSign" @close="ShowSign = false" />

          <!-- Đã đăng nhập -->
          <div v-if="userStore.isLoggedIn" class="position-relative user-dropdown">
            <div
              class="btn btn-outline-primary d-flex align-items-center gap-2"
              @click="toggleUserDropdown"
            >
            👤 {{ userStore.name }} ({{ userStore.role }})
            </div>
            
            <!-- Dropdown hiển thị khi click -->
            <div
              v-if="showUserDropdown"
              class="dropdown-menu show position-absolute end-0 mt-2 p-2 shadow-sm"
            >
              <button class="btn btn-danger btn-sm w-100" @click="logout()">Đăng xuất</button>
            </div>
          </div>


          <!-- Chưa đăng nhập -->
          <div v-else>
            <button @click="ShowSign = true" class="btn btn-success">👤</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar (Mobile) -->
    <div class="sidebar bg-white shadow" :class="{ open: sidebarOpen }">
      <div class="d-flex justify-content-between p-3 border-bottom">
        <strong>Menu</strong>
        <button class="btn-close" @click="toggleSidebar"></button>
      </div>
      <ul v-if="isUserLoaded" class="list-group list-group-flush">
        <li
          v-for="(item, index) in filteredNavItems"
          :key="index"
          class="list-group-item"
        >
          <div>
            <template v-if="item.to">
              <router-link
                :to="item.to"
                class="fw-bold text-decoration-none"
                @click="setActive(index); toggleSidebar()"
              >
                {{ item.title }}
              </router-link>
            </template>
            <template v-else>
              <span class="fw-bold text-decoration-none">{{ item.title }}</span>
            </template>

            <!-- Accordion dropdown -->
            <ul v-if="item.children" class="ps-3 mt-2">
              <li
                v-for="(child, i) in item.children"
                :key="i"
                class="text-muted small py-1"
              >
                <router-link
                  v-if="child.to"
                  :to="child.to"
                  class="fw-bold text-decoration-none"
                  @click="toggleSidebar()"
                >
                  {{ child.name }}
                </router-link>
                <span v-else class="text-decoration-none">{{ child.name }}</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

    <!-- Overlay -->
    <div v-if="sidebarOpen" class="sidebar-overlay" @click="toggleSidebar"></div>
  </div>
</template>

<script setup>
import { ref,computed, onMounted } from 'vue';
import Sign from './Sign.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/store/user';
import router from '@/router';
import { fetchUserInfo } from '@/fetchUser.js'


const userStore = useUserStore();
const userRole = computed(() => userStore.role);

const isUserLoaded = ref(false)
const ShowSign = ref(false);
const activeIndex = ref(0);
const sidebarOpen = ref(false);
const dropdownIndex = ref(null);

const route = useRoute();

const showUserDropdown = ref(false);

onMounted(() => {
  fetchUserInfo()
  isUserLoaded.value = true
})


const logout=()=>{
  router.push('/');
  userStore.logout();
}

const navItems = [
  {
    id:1,
    title: 'Trang chủ',
    to: '/'
  },
  {
    id:2,
    title: 'Giới thiệu',
    to: '/about',
    children: [
      { name: 'Lịch sử hình thành', to: '/about' },
      { name: 'Đội ngũ nhân sự', to: '/about/nhansu' }
    ]
  },
  {
    id:3,
    title: 'Đăng tài liệu',
    to: '/GiangVien',
    children: [ 
      { name: 'Đăng tài liệu', to: '/GiangVien' },
      { name: 'Tài liệu giảng viên', to: '/teacher' }
    ]
  },
  {
    id:4,
    title: 'Học tập',
    to: '/HocTap/TaiLieu',
    children: [ 
      { name: 'Tài liệu SV', to: '/HocTap/TaiLieu' },
      { name: 'Bài tập', to: '/HocTap/BaiTap' }
    ]
  },
  {
    id:5,
    title: 'Admin',
    to: '/taikhoan/dangky',
    children: [ 
      { name: 'Đăng ký thông tin', to: '/taikhoan/dangky' },
      { name: 'Xóa tài khoản', to: '/taikhoan/xoa' }
    ]
  },
  {
    id:6,
    title: 'Tuyển sinh',
    to: '/tuyensinh',
    children: [
      { name: 'Chương trình đào tạo', to: '/tuyensinh/daotao' },
      { name: 'Chuẩn đầu ra', to: '/tuyensinh/chuandaura' }
    ]
  },
 {
  id: 7,
  title: 'Diễn Đàn',
  to: '/forum'  
  },
  {
  id: 8,
  title: 'Bảng Điểm',
  to: '/diem'  
  },
  {
  id: 9,
  title: 'Thêm Điểm SV',
  to: '/themdiem'  
  }
];

const filteredNavItems = computed(() => {
  switch (userRole.value) {
    case 'Sinh viên':
      return navItems.filter(item => [1, 2, 4, 6, 7, 8].includes(item.id))
    case 'Giảng viên':
      return navItems.filter(item => [1, 2, 3, 6, 7, 9].includes(item.id))
    case 'admin':
      return navItems.filter(item => [1, 2, 5, 6, 7].includes(item.id))
    default:
      return navItems.filter(item => [1, 2, 6, 7].includes(item.id))
  }
})


// Xác định menu nào đang active dựa vào route
const isActive = (item) => {
  if (!item.to){return false;}
  return route.path === item.to || route.path.startsWith(item.to + '/');
};

function toggleUserDropdown() {
  showUserDropdown.value = !showUserDropdown.value;
}

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
function setActive(index) {
  activeIndex.value = index;
  dropdownIndex.value = null;
}
function showDropdown(index) {
  dropdownIndex.value = index;
}
function hideDropdown() {
  dropdownIndex.value = null;
}
</script>

<style scoped>
img {
  width: 45px;
  z-index: 100;
}

/* Navbar */
.navbar {
  background: #fff;
  transition: box-shadow 0.3s ease;
}
.navbar:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Navbar links */
.nav-link {
  color: #333;
  position: relative;
  transition: all 0.2s ease;
}
.nav-link:hover {
  color: #198754;
  transform: translateY(-2px);
}

/* Active tab underline */
.nav-link.active {
  color: #198754 !important;
}
.nav-link.active::after {
  content: '';
  display: block;
  height: 2px;
  background-color: #198754;
  width: 100%;
  position: absolute;
  bottom: -6px;
  left: 0;
}

/* Dropdown animation */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 180px;
  padding: 10px 0;
  margin-top: 0.2rem;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  animation: dropdownFade 0.3s ease;
  z-index: 1000;
}
@keyframes dropdownFade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.dropdown-item:hover {
  background-color: #f1f1f1;
  color: #198754;
}

/* Sidebar styles (mobile) */
.sidebar {
  position: fixed;
  top: 0;
  left: -270px;
  width: 260px;
  height: 100vh;
  background: #fff;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: left 0.3s ease;
  z-index: 1050;
}
.sidebar.open {
  left: 0;
}
.sidebar .list-group-item {
  border: none;
  padding: 1rem;
  font-weight: 500;
}
.sidebar .list-group-item:hover {
  background: #f8f9fa;
  color: #198754;
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1040;
}

/* Buttons */
button {
  transition: all 0.2s ease;
}
button:hover {
  transform: scale(1.05);
}
.btn-success {
  background-color: #198754;
  border-color: #198754;
}

/* Search input */
input.form-control {
  border-radius: 20px;
  padding-left: 14px;
}
/* GENERAL FONT STYLE */
* {
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
}

/* LOGO */
.navbar-brand img {
  height: 50px;
  border-radius: 12px;
  transition: transform 0.3s ease;
}
.navbar-brand img:hover {
  transform: scale(1.05);
}

/* ENHANCED NAVBAR */
.navbar {
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: linear-gradient(90deg, #ffffff, #f8f9fa);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid #e9ecef;
  z-index: 1050;
}

.navbar-nav .nav-link {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 16px;
}

.navbar-nav .nav-link:hover {
  background-color: #eafaf1;
  color: #198754;
}

/* SEARCH INPUT IMPROVED */
input.form-control {
  border-radius: 50px;
  padding-left: 16px;
  border: 1px solid #ced4da;
  font-size: 14px;
  width: 180px;
  transition: width 0.3s ease;
}
input.form-control:focus {
  width: 220px;
  box-shadow: 0 0 0 0.15rem rgba(25, 135, 84, 0.25);
  border-color: #198754;
}

/* SEARCH BUTTON */
.btn-success {
  border-radius: 50px;
  padding: 6px 12px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(25, 135, 84, 0.3);
}
.btn-success:hover {
  background-color: #157347;
  border-color: #157347;
}

/* SIDEBAR MODERN LOOK */
.sidebar {
  background: #ffffff;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  box-shadow: 3px 0 12px rgba(0, 0, 0, 0.1);
}
.sidebar .list-group-item {
  border: none;
  font-size: 16px;
  transition: background 0.2s ease;
}
.sidebar .list-group-item:hover {
  background: #eafaf1;
  color: #198754;
}
.sidebar ul li span,
.sidebar ul li a {
  font-size: 15px;
}

/* DROPDOWN ITEMS STYLED */
.dropdown-menu {
  border-radius: 12px;
  padding: 0.5rem 0;
}
.dropdown-item {
  font-size: 15px;
  padding: 8px 20px;
  transition: background 0.2s ease, color 0.2s ease;
}
.dropdown-item:hover {
  background-color: #eafaf1;
  color: #198754;
}

/* BUTTON LOGIN ICON */
button.btn-success:has(svg),
button.btn-success:has(.icon) {
  padding: 6px 10px;
}

/* OVERLAY SMOOTHER */
.sidebar-overlay {
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
}
</style>