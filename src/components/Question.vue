<template>
    <div class="flex flex-col items-center p-4">
      <div class="text-2xl font-bold mb-4">Trắc nghiệm song ngữ</div>
      
      <div class="grid grid-cols-2 gap-8 w-full max-w-4xl transition-all duration-300">
        <!-- English Quiz -->
        <div class="bg-blue-100 p-4 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold mb-2">English</h2>
          <p class="mb-4">{{ englishQuestions[enIndex].question }}</p>
          <div v-for="(opt, idx) in englishQuestions[enIndex].options" :key="idx" class="mb-2">
            <label class="flex items-center space-x-2">
              <input type="radio" :name="'en-' + enIndex" :value="opt" v-model="selectedEn" @change="checkAnswer('en')" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>
  
        <!-- Korean Quiz -->
        <div class="bg-pink-100 p-4 rounded-2xl shadow-md">
          <h2 class="text-xl font-semibold mb-2">한국어</h2>
          <p class="mb-4">{{ koreanQuestions[krIndex].question }}</p>
          <div v-for="(opt, idx) in koreanQuestions[krIndex].options" :key="idx" class="mb-2">
            <label class="flex items-center space-x-2">
              <input type="radio" :name="'kr-' + krIndex" :value="opt" v-model="selectedKr" @change="checkAnswer('kr')" />
              <span>{{ opt }}</span>
            </label>
          </div>
        </div>
      </div>
  
      <button @click="next" class="mt-6 px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all">
        Tiếp theo
      </button>
  
      <div class="mt-4 text-gray-700">
        <p>Điểm: {{ score }}</p>
        <p>Thời gian: {{ time }} giây</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  
  const englishQuestions = [
    { question: 'What is the synonym of "happy"?', options: ['Sad', 'Joyful', 'Angry'], answer: 'Joyful' },
    { question: 'Choose the antonym of "cold".', options: ['Hot', 'Freezing', 'Cool'], answer: 'Hot' },
    { question: 'What does "run" mean?', options: ['Walk slowly', 'Move quickly on foot', 'Eat food'], answer: 'Move quickly on foot' },
    { question: 'What is the opposite of "fast"?', options: ['Slow', 'Quick', 'Speedy'], answer: 'Slow' },
    { question: 'Which of the following is a fruit?', options: ['Carrot', 'Apple', 'Tomato'], answer: 'Apple' },
    { question: 'Which word is a verb?', options: ['Happy', 'Run', 'Quick'], answer: 'Run' },
  ]
  
  const koreanQuestions = [
    { question: '‘학교’의 뜻은?', options: ['School', 'House', 'Market'], answer: 'School' },
    { question: '‘감사합니다’는 언제 사용합니까?', options: ['인사할 때', '고마움을 표현할 때', '사과할 때'], answer: '고마움을 표현할 때' },
    { question: '‘사랑’의 의미는?', options: ['Hate', 'Love', 'Food'], answer: 'Love' },
    { question: '‘친구’의 뜻은?', options: ['Friend', 'Family', 'Stranger'], answer: 'Friend' },
    { question: '‘행복’은 무엇인가요?', options: ['Sadness', 'Joy', 'Anger'], answer: 'Joy' },
    { question: '‘물’의 뜻은?', options: ['Water', 'Fire', 'Earth'], answer: 'Water' },
  ]
  
  const enIndex = ref(0)
  const krIndex = ref(0)
  const selectedEn = ref('')
  const selectedKr = ref('')
  const score = ref(0)
  const time = ref(0)
  let timer = null
  let started = ref(false)
  
  onMounted(() => {
    // Khi trang đã được tải, bắt đầu đếm thời gian sau khi sinh viên bắt đầu làm bài
    watch([selectedEn, selectedKr], ([newEn, newKr]) => {
      if (!started.value && newEn !== '' && newKr !== '') {
        started.value = true
        startTimer()
      }
    },
    { immediate: false, flush: 'post' }
  )
  })
  
  function startTimer() {
    // Bắt đầu đếm thời gian khi người chơi bắt đầu
    console.log('⏱ Timer started!')
    timer = setInterval(() => {
      time.value++
    }, 1000)
  }
  
  function stopTimer() {
    // Dừng đếm thời gian khi hoàn thành
    clearInterval(timer)
  }
  
  function checkAnswer(language) {
    // Kiểm tra đáp án và cộng điểm cho câu hỏi tương ứng
    if (language === 'en' && selectedEn.value === englishQuestions[enIndex.value].answer) {
      score.value++
    }
    if (language === 'kr' && selectedKr.value === koreanQuestions[krIndex.value].answer) {
      score.value++
    }
  }
  
  function next() {
    // Chuyển sang câu hỏi tiếp theo
    if (enIndex.value < englishQuestions.length - 1) enIndex.value++
    if (krIndex.value < koreanQuestions.length - 1) krIndex.value++
  
    selectedEn.value = ''
    selectedKr.value = ''
  
    if (enIndex.value === englishQuestions.length - 1 && krIndex.value === koreanQuestions.length - 1) {
      stopTimer()
      alert('Bạn đã hoàn thành! Tổng điểm: ' + score.value + ' | Thời gian: ' + time.value + ' giây')
      resetGame()
    }
  }
  
  function resetGame() {
    // Reset lại game sau khi hoàn thành
    enIndex.value = 0
    krIndex.value = 0
    selectedEn.value = ''
    selectedKr.value = ''
    score.value = 0
    time.value = 0
    started.value = false
    // Reset lại timer
    clearInterval(timer)
    timer = null
  }
  </script>
  
  <style scoped>
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Chia đều 2 cột */
    gap: 16px;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .grid div {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .bg-blue-100 {
    background-color: #e0f7fa; /* Màu nền câu hỏi tiếng Anh */
  }
  
  .bg-pink-100 {
    background-color: #fce4ec; /* Màu nền câu hỏi tiếng Hàn */
  }
  
  input[type="radio"] {
    accent-color: #4ade80;
  }
  
  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #34d399;
    color: white;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #2bbf6d;
  }
  
  .flex {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .text-2xl {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .transition-all {
    transition: all 0.3s ease;
  }
  
  .p-4 {
    padding: 16px;
  }
  </style>
  