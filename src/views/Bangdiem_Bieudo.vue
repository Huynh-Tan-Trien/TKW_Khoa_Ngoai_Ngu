<template>
  <header-web/>
  <div class="p-6 bg-matcha min-h-screen text-matcha font-sans">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl font-bold mb-4 text-green-700">🎓 Bảng điểm sinh viên - Khoa Ngoại Ngữ</h2>

      <!-- Thông tin sinh viên -->
      <p class="text-green-700 mb-6 text-lg">
        👤 Sinh viên: {{ userStore.name }} | MSSV: {{ userStore.ms }}
      </p>

      <!-- Bộ lọc -->
      <div class="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <label class="text-lg font-semibold mr-2" for="semester-select">Chọn học kỳ:</label>
          <select
            id="semester-select"
            v-model="selectedSemester"
            class="filter-select"
          >
            <option v-for="(label, value) in semesterOptions" :key="value" :value="value">{{ label }}</option>
          </select>
        </div>

        <div>
          <label class="text-lg font-semibold mr-2" for="type-select">Loại môn:</label>
          <select
            id="type-select"
            v-model="selectedType"
            class="filter-select"
          >
            <option value="">Tất cả</option>
            <option v-for="(label, value) in typeOptions" :key="value" :value="value">
              {{ label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="text-green-600 text-lg font-semibold">Đang tải dữ liệu...</div>

      <div v-else>
        <!-- Bảng điểm -->
        <table class="score-table mb-8 shadow-matcha">
          <thead>
            <tr>
              <th>Môn học</th>
              <th>Tín chỉ</th>
              <th>Thường xuyên</th>
              <th>Giữa kỳ</th>
              <th>Cuối kỳ</th>
              <th>Trung bình</th>
              <th>Xếp loại</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="subject in filteredSubjects"
              :key="subject.id"
              class="score-row"
            >
              <td>{{ subject.name }}</td>
              <td>{{ subject.credits }}</td>
              <td>{{ subject.regular }}</td>
              <td>{{ subject.midterm }}</td>
              <td>{{ subject.final }}</td>
              <td>{{ calcAverage(subject).toFixed(2) }}</td>
              <td :class="getGradeClass(calcAverage(subject))" class="font-semibold">
                {{ getGrade(calcAverage(subject)) }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Tổng kết điểm -->
        <div class="summary-text mb-6 text-lg font-semibold">
          🧮 Trung bình học kỳ: <span>{{ avgSemester }}</span> -
          Xếp loại: <span :class="getGradeClass(avgSemester)">{{ overallGrade }}</span>
        </div>

        <!-- Biểu đồ -->
        <!-- <div class="bg-white p-6 rounded shadow-md max-w-full overflow-x-auto">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold text-green-700 select-none">
              📊 Biểu đồ môn học - {{ semesterOptions[selectedSemester] }}
            </h3>
            <button
              @click="toggleChartType"
              class="btn-toggle-chart"
              type="button"
            >
              Chuyển sang {{ chartType === 'bar' ? 'Radar' : 'Cột' }}
            </button>
          </div>
          <component :is="chartComponent" :data="chartData" :options="chartOptions" />
        </div> -->
      </div>
    </div>
  </div>
  <footer-web/>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useUserStore } from '@/store/user'
import supabase from '@/supabase'
import HeaderWeb from '@/components/HeaderWeb.vue'
import FooterWeb from '@/components/FooterWeb.vue'


const userStore = useUserStore()
const subjects = ref([])
const selectedSemester = ref('hk1')
const selectedType = ref('')
const loading = ref(true)


const semesterOptions = {
  hk1: 'Học kỳ 1',
  hk2: 'Học kỳ 2',
  hk3: 'Học kỳ 3'
}
const fetchScores = async () => {
  loading.value = true
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('semester', selectedSemester.value)
    .eq('mssv', userStore.ms) // chỉ lấy điểm của chính user

  if (!error && data) subjects.value = data
  else console.error(error)

  loading.value = false
}

onMounted(fetchScores)
watch(selectedSemester, fetchScores)

const calcAverage = (s) => s.regular * 0.2 + s.midterm * 0.3 + s.final * 0.5

const getGrade = (score) => {
  if (score >= 8.5) return 'Giỏi'
  if (score >= 7.0) return 'Khá'
  if (score >= 5.0) return 'Trung bình'
  return 'Yếu'
}

const getGradeClass = (score) => {
  if (score >= 8.5) return 'text-green-700'
  if (score >= 7.0) return 'text-lime-600'
  if (score >= 5.0) return 'text-yellow-600'
  return 'text-red-600'
}

const typeOptions = {
  batbuoc: 'Bắt buộc',
  tuchon: 'Tự chọn'
}

function slugify(str) {
  return str
    .normalize('NFD') // chuẩn hóa ký tự có dấu
    .replace(/[\u0300-\u036f]/g, '') // xóa dấu
    .toLowerCase()
    .replace(/\s+/g, '') // xóa khoảng trắng
}

const filteredSubjects = computed(() =>
  selectedType.value
    ? subjects.value.filter(s =>
        slugify(s.type) === selectedType.value
      )
    : subjects.value
)


const avgSemester = computed(() => {
  if (!filteredSubjects.value.length) return 0
  const total = filteredSubjects.value.reduce((sum, s) => sum + calcAverage(s), 0)
  return (total / filteredSubjects.value.length).toFixed(2)
})

const overallGrade = computed(() => getGrade(avgSemester.value))


</script>

<style scoped>
/* Tông màu matcha, font dễ đọc */
.bg-matcha {
  background-color: #f5fff7;
}

.text-matcha {
  color: #2e7d32;
}

.shadow-matcha {
  box-shadow: 0 2px 8px rgba(0, 100, 0, 0.12);
}

/* Tiêu đề */
h2, h3 {
  color: #1b5e20;
  user-select: none;
}

/* Bảng điểm */
.score-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #c8e6c9;
}

.score-table thead tr {
  background-color: #dcedc8;
  color: #33691e;
}

.score-table th, .score-table td {
  padding: 12px 14px;
  border: 1px solid #e8f5e9;
  font-size: 14px;
  text-align: center;
  vertical-align: middle;
}

.score-row:hover {
  background-color: #f1f8e9;
  transition: background-color 0.25s ease;
}

/* Bộ lọc */
.filter-select {
  padding: 8px 14px;
  border: 1px solid #a5d6a7;
  border-radius: 6px;
  background-color: #fff;
  color: #2e7d32;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(130, 190, 130, 0.3);
  transition: border-color 0.2s ease;
}
.filter-select:hover,
.filter-select:focus {
  border-color: #81c784;
  outline: none;
}

/* Button chuyển đổi biểu đồ */
.btn-toggle-chart {
  padding: 6px 14px;
  background-color: #c8e6c9;
  border: 1px solid #81c784;
  color: #1b5e20;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
}
.btn-toggle-chart:hover {
  background-color: #a5d6a7;
}

/* Tổng kết điểm */
.summary-text {
  color: #2e7d32;
  user-select: none;
}

/* Điểm màu sắc xếp loại */
.text-green-700 {
  color: #2e7d32 !important;
}
.text-lime-600 {
  color: #9ccc65 !important;
}
.text-yellow-600 {
  color: #fbc02d !important;
}
.text-red-600 {
  color: #e53935 !important;
}
</style>
