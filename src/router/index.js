// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import NhanSu from '@/views/NhanSu.vue';
import GiangVien from '@/views/GiangVien.vue';
import TeacherMaterials from '@/views/TeacherMaterials.vue';
import TaiLieuSinhVien from '@/views/TaiLieuSinhVien.vue';
import BaiTapSinhVien from '@/views/BaiTapSinhVien.vue';
import TuyenSinh from '@/views/TuyenSinh.vue';
import DaoTao from '@/views/ChuongTrinhDT.vue';
import ChuanDauRa from '@/views/ChuanDauRa.vue';
import ThongTinGiangVien from '@/components/ThongTinGiangVien.vue';
import DangKy from '@/views/DangKy.vue';
import Delete from '@/views/Delete.vue';
import Forum from '@/views/Forum.vue';
import Bangdiem_Bieudo from '@/views/Bangdiem_Bieudo.vue';
import ThemDiemSV from '@/views/ThemDiemSV.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/about/nhansu', name: 'NhanSu', component: NhanSu },
  { path: '/GiangVien', name: 'GiangVien', component: GiangVien },
  { path: '/teacher', name: 'Teacher', component: TeacherMaterials },
  { path: '/HocTap/TaiLieu', name: 'TaiLieu', component: TaiLieuSinhVien },
  { path: '/HocTap/BaiTap', name: 'BaiTap', component: BaiTapSinhVien },
  { path: '/tuyensinh', name: 'TuyenSinh', component: TuyenSinh},
  { path: '/tuyensinh/daotao', name: 'DaoTao', component: DaoTao },
  { path: '/tuyensinh/chuandaura', name: 'ChuanDauRa', component: ChuanDauRa },
  { path: '/taikhoan/dangky', name:'dangky', component: DangKy},
  { path: '/taikhoan/xoa', name:'Xoa', component: Delete},
  { path: '/forum', name: 'Forum', component: Forum },
  { path: '/diem', name: 'Bangdiem', component: Bangdiem_Bieudo },
  { path: '/themdiem', name: 'Themdiem', component: ThemDiemSV },


  { path: '/DSGV/', name: 'DSGVlist', component: ThongTinGiangVien},
  { path: '/DSGV/:id', name: 'DSGVdetail', component: ThongTinGiangVien}
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
