<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { useUserStore } from '@/store/user';
import WeatherReminder from './WeatherReminder.vue';
import router from '@/router';
import supabase from '@/supabase';

const emit = defineEmits(['close']);
const userStore = useUserStore();

const email = ref('');
const password = ref('');

const roleLabel = {
  student: 'Sinh viên',
  teacher: 'Giảng viên',
  admin: 'admin'
};

const handleSubmit = async () => {
  const inputEmail = email.value.trim();
  const inputPassword = password.value.trim();
  let user = null;
  let role = null;
  let error = null;

  // 1. Kiểm tra trong bảng students
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('id, mssv, email, name, role')
    .eq('email', inputEmail)
    .eq('password', inputPassword) 
    .single();

  if (studentData && !studentError) {
    user = studentData;
    role = 'Sinh viên';
  } else {
    // 2. Kiểm tra trong bảng teachers
    const { data: teacherData, error: teacherError } = await supabase
      .from('teachers')
      .select('id, msgv, email, name, role')
      .eq('email', inputEmail)
      .eq('password', inputPassword)
      .single();

    if (teacherData && !teacherError) {
      user = teacherData;
      role = teacherData.role === 'admin' ? 'Admin' : 'Giảng viên';
    } else {
      // Không tìm thấy trong bảng → lỗi
      error = studentError || teacherError || new Error('Không tìm thấy người dùng');
    }
  }

  if (!user || error) {
    alert('Email hoặc mật khẩu không đúng!');
    return;
  }

  userStore.setUser(user.mssv || user.msgv,user.email, user.name, role);
  
  alert(`Đăng nhập thành công với vai trò ${roleLabel[role] || role}!`);
  emit('close');
  router.push('/');
};
</script>

<template>
  <div class="modal">
    <WeatherReminder/>
    <div class="modal-content">
      <button class="close-btn" @click="emit('close')">X</button>
      <h2>Đăng nhập</h2>
      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" placeholder="Email" autocomplete="username" required />
        <input v-model="password" type="password" autocomplete="current-password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 450px;
  height: 60%;
  margin-top: 20px;
}
select {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  padding: 10px;
  width: 100%;
  cursor: pointer;
  background: #00b147;
}
p {
  cursor: pointer;
  color: blue;
}
.close-btn {
  position: absolute;
  border: none;
  outline: none;
  width: 10%;
  left: 380px;
  top: 10px;
  background: #00b147;
}
</style>
