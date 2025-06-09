<template>
    <div>
        <HeaderWeb />
        <div class="container mt-5 mb-5">
            <div class="card mx-auto shadow" style="max-width: 500px;">
                <div class="card-body">
                <h2 class="card-title text-center mb-4">Đăng ký</h2>
                <form @submit.prevent="handleAddUser">
                    <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input v-model="newUser.email" type="email" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Mật khẩu</label>
                    <input v-model="newUser.password" type="password" autocomplete="new-password" class="form-control" required />
                    </div>
                    
                    <div class="mb-3" v-if="role === 'teacher'">
                    <label class="form-label">Mã số giảng viên</label>
                    <input v-model="newUser.msgv" type="text" class="form-control" required />
                    </div>
                    
                    <div class="mb-3" v-else>
                    <label class="form-label">Mã số sinh viên</label>
                    <input v-model="newUser.mssv" type="text" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Họ tên</label>
                    <input v-model="newUser.name" type="text" class="form-control" required />
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Ngày sinh</label>
                    <input v-model="newUser.birthday" type="date" class="form-control" required />
                    
                    </div>

                    <div class="mb-3">
                    <label class="form-label">Vai trò</label>
                    <select v-model="newUser.role">
                        <option value="Sinh viên">Sinh viên</option>
                        <option value="Giảng viên">Giảng viên</option>
                    </select>
                    </div>

                    <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
                    
                    <div v-if="successMessage" class="alert alert-success mt-3" role="alert">
                    {{ successMessage }}
                    </div>
                    <div v-else-if="errorMessage" class="alert alert-danger mt-3" role="alert">
                      {{ errorMessage }}
                    </div>
                </form>
                </div>
            </div>
        </div>
        <FooterWeb />
    </div>
</template>
  
<script setup>
import HeaderWeb from '@/components/HeaderWeb.vue';
import FooterWeb from '@/components/FooterWeb.vue';
import { ref, computed } from 'vue';
import supabase from '../supabase';

const errorMessage = ref('');

const successMessage = ref('');

const newUser = ref({
  name: '',
  email: '',
  password: '',
  role: '',
  birthday: '',
  mssv: '',
  msgv: ''
});

// Chuyển vai trò về dạng máy đọc được
const role = computed(() => {
  return newUser.value.role === 'Giảng viên' ? 'Giảng viên' : 'Sinh viên';
});

const handleAddUser = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  const birthDate = new Date(newUser.value.birthday);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    errorMessage.value = 'Năm sinh không hợp lệ. Bạn phải đủ 18 tuổi trở lên.';
    return;
  }

  const userData = {
    name: newUser.value.name,
    email: newUser.value.email,
    password: newUser.value.password,
    birthday: newUser.value.birthday,
    role: role.value,
    status: true
  };

  if (role.value === 'Sinh viên') {
    userData.mssv = newUser.value.mssv;

    // 🔍 Kiểm tra MSSV đã tồn tại chưa
    const { data: existingStudent, error: checkError } = await supabase
      .from('students')
      .select('mssv')
      .eq('mssv', userData.mssv)
      .single();

    if (existingStudent) {
      errorMessage.value = 'Mã số sinh viên đã tồn tại.';
      return;
    }

    const { error } = await supabase.from('students').insert([userData]);
    if (error) {
      errorMessage.value = 'Lỗi khi đăng ký sinh viên.';
      console.error(error);
      return;
    }

  } else if (role.value === 'Giảng viên') {
    userData.msgv = newUser.value.msgv;

    // 🔍 Kiểm tra MSGV đã tồn tại chưa
    const { data: existingTeacher, error: checkError } = await supabase
      .from('teachers')
      .select('msgv')
      .eq('msgv', userData.msgv)
      .single();

    if (existingTeacher) {
      errorMessage.value = 'Mã số giảng viên đã tồn tại.';
      return;
    }

    const { error } = await supabase.from('teachers').insert([userData]);
    if (error) {
      errorMessage.value = 'Lỗi khi đăng ký giảng viên.';
      console.error(error);
      return;
    }
  }

  newUser.value = {
    name: '',
    email: '',
    password: '',
    role: '',
    birthday: '',
    mssv: '',
    msgv: ''
  };

  successMessage.value = 'Đăng ký thành công!';
};

</script>

