<template>
    <header-web/>
    <div class="col-lg-6 min-h-screen flex items-center justify-center mx-auto my-2 bg-gray-50">
        <div class="bg-white rounded-lg shadow-md w-full max-w-2xl" style="padding: 20px;">
            <h2 class="text-2xl font-bold text-green-700 mb-4">➕ Thêm điểm môn học</h2>
            <form @submit.prevent="handleSubmit" class="grid gap-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                    <label class="form-label">MSSV</label>
                    <input v-model="form.mssv" type="text" class="form-input" required />
                </div>
                <div>
                    <label class="form-label">Tên môn học</label>
                    <input v-model="form.name" type="text" class="form-input" required />
                </div>
                <div>
                    <label class="form-label">Tín chỉ</label>
                    <input v-model.number="form.credits" type="number" class="form-input" min="1" required />
                </div>
                <div>
                    <label class="form-label">Điểm thường xuyên</label>
                    <input v-model.number="form.regular" type="number" class="form-input" step="0.1" min="0" max="10" required />
                </div>
                <div>
                    <label class="form-label">Điểm giữa kỳ</label>
                    <input v-model.number="form.midterm" type="number" class="form-input" step="0.1" min="0" max="10" required />
                </div>
                <div>
                    <label class="form-label">Điểm cuối kỳ</label>
                    <input v-model.number="form.final" type="number" class="form-input" step="0.1" min="0" max="10" required />
                </div>
                <div>
                    <label class="form-label">Loại môn</label>
                    <select v-model="form.type" class="form-input" required>
                    <option value="">-- Chọn loại môn --</option>
                    <option value="Bắt buộc">Bắt buộc</option>
                    <option value="Tự chọn">Tự chọn</option>
                    </select>
                </div>
                <div>
                    <label class="form-label">Học kỳ</label>
                    <select v-model="form.semester" class="form-input" required>
                    <option value="">-- Chọn học kỳ --</option>
                    <option value="hk1">Học kỳ 1</option>
                    <option value="hk2">Học kỳ 2</option>
                    <option value="hk3">Học kỳ 3</option>
                    </select>
                </div><br>
                </div>
        
                <div style="text-align: center;">
                    <button type="submit" class="bg-green-600 hover:bg-green-700 text-black font-semibold py-2 px-4 rounded">
                    Lưu điểm
                    </button>
                </div>
        
                <p v-if="successMessage" class="text-green-700 font-medium mt-2">{{ successMessage }}</p>
                <p v-if="errorMessage" class="text-red-600 font-medium mt-2">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
    <footer-web/>
</template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  import supabase from '@/supabase'
  import HeaderWeb from '@/components/HeaderWeb.vue'
  import FooterWeb from '@/components/FooterWeb.vue'
  
  const successMessage = ref('')
  const errorMessage = ref('')
  
  const form = reactive({
    mssv: '',
    name: '',
    credits: null,
    regular: null,
    midterm: null,
    final: null,
    type: '',
    semester: ''
  })
  
  const resetForm = () => {
    form.mssv = ''
    form.name = ''
    form.credits = null
    form.regular = null
    form.midterm = null
    form.final = null
    form.type = ''
    form.semester = ''
  }
  
  const handleSubmit = async () => {
  successMessage.value = ''
  errorMessage.value = ''

  // 1. Kiểm tra MSSV có trong bảng students không
  const { data: studentData, error: studentError } = await supabase
    .from('students')
    .select('mssv')
    .eq('mssv', form.mssv)
    .single()

  if (studentError || !studentData) {
    errorMessage.value = '❌ MSSV không tồn tại trong danh sách sinh viên.'
    return
  }

  // 2. Kiểm tra xem điểm môn học đã tồn tại chưa (theo mssv, name, semester)
  const { data: scoreData, error: checkError } = await supabase
    .from('scores')
    .select('id') // hoặc khóa chính của bảng
    .eq('mssv', form.mssv)
    .eq('name', form.name)
    .eq('semester', form.semester)
    .single()

  // 3. Nếu đã tồn tại thì UPDATE, nếu chưa thì INSERT
  if (scoreData) {
    const { error: updateError } = await supabase
      .from('scores')
      .update({
        credits: form.credits,
        regular: form.regular,
        midterm: form.midterm,
        final: form.final,
        type: form.type
      })
      .eq('id', scoreData.id)

    if (updateError) {
      errorMessage.value = '❌ Cập nhật điểm thất bại.'
      console.error(updateError)
    } else {
      successMessage.value = '✅ Cập nhật điểm thành công!'
      resetForm()
    }
  } else {
    const { error: insertError } = await supabase.from('scores').insert({
      mssv: form.mssv,
      name: form.name,
      credits: form.credits,
      regular: form.regular,
      midterm: form.midterm,
      final: form.final,
      type: form.type,
      semester: form.semester
    })

    if (insertError) {
      errorMessage.value = '❌ Thêm điểm thất bại.'
      console.error(insertError)
    } else {
      successMessage.value = '✅ Thêm điểm thành công!'
      resetForm()
    }
  }
}


  </script>
  
  <style scoped>
  .form-label {
    display: block;
    font-weight: 600;
    color: #2e7d32;
    margin-bottom: 0.25rem;
  }
  .form-input {
    width: 100%;
    border: 1px solid #c8e6c9;
    border-radius: 0.375rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  </style>
  