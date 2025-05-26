<template>
  <div v-if="weatherData" class="weather-reminder">
   <!-- Khối bên trái: Vị trí và ngày tháng -->
   <div class="weather-left">
     <h4>{{ weatherData.city }}</h4>
     <p>{{ currentDate }}</p>
   </div>
 
   <!-- Khối bên phải: Nhiệt độ và Icon -->
   <div class="weather-right">
     <img :src="weatherIcon" alt="Weather Icon" class="weather-icon" />
     <p class="weather-temp">{{ weatherData.temperature }}°C</p>
   </div>
 </div>
 
 <!-- Thông báo thời tiết (đưa xuống dưới khối thông tin) -->
 <div v-if="weatherData" class="weather-reminder-message" :class="reminderClass">
   <div class="marquee">
     <p>Xin chào bạn!{{ reminderMessage }}</p>
   </div>
 </div>
 </template>
   
   <script setup>
 import { ref, onMounted } from 'vue';
 
 
 const weatherData = ref(null);
 const reminderMessage = ref('');
 const reminderClass = ref('');
 const weatherIcon = ref('');
 const currentDate = ref('');
 
 // Hàm lấy biểu tượng thời tiết
 const getWeatherIconUrl = (iconCode) => {
   return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 };
 
 // Lấy ngày tháng hiện tại
 const formatDate = () => {
   const now = new Date();
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
   return now.toLocaleDateString('vi-VN', options);
 };
 
 // Fetch weather
 const fetchWeatherData = async () => {
   try {
     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh&units=metric&appid=26505bd53fd4a789126c19a1f83c56ee&lang=vi`);
     if (!response.ok) {
       throw new Error('Lỗi khi lấy dữ liệu thời tiết');
     }
     const data = await response.json();
 
     weatherData.value = {
       city: data.name,
       weatherDescription: data.weather[0].description,
       temperature: data.main.temp,
     };
 
     weatherIcon.value = getWeatherIconUrl(data.weather[0].icon);
     currentDate.value = formatDate();
 
     setReminderMessage();
   } catch (error) {
     console.error('Error fetching weather data:', error);
   }
 };
 
 
 const setReminderMessage = () => {
   const temp = weatherData.value.temperature;
   const description = weatherData.value.weatherDescription.toLowerCase();
 
   if (description.includes('mưa')) {
     reminderMessage.value = '🌧 Trời đang mưa. Đừng quên mang theo áo mưa hoặc dù nhé!';
     reminderClass.value = 'rainy';
   } else if (description.includes('mây') || description.includes('u ám')) {
     reminderMessage.value = '☁️ Trời nhiều mây. Có thể sẽ có mưa, hãy chú ý theo dõi thời tiết!';
     reminderClass.value = 'cloudy';
   } else if (temp < 10) {
     reminderMessage.value = '❄️ Thời tiết rất lạnh. Hãy mặc ấm và chú ý bảo vệ sức khỏe!';
     reminderClass.value = 'cold';
   } else if (temp >= 10 && temp <= 25) {
     reminderMessage.value = '🌤 Thời tiết dễ chịu. Đừng quên uống đủ nước!';
     reminderClass.value = 'mild';
   } else {
     reminderMessage.value = '🔥 Thời tiết nóng. Hãy giữ mát và hạn chế ra ngoài khi có thể!';
     reminderClass.value = 'hot';
   }
 };
 
 onMounted(() => {
   fetchWeatherData();
 });
   </script>
   
 <style scoped>
  .weather-reminder {
   width: 600px;
   height: 20%;
   padding: 10px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   gap: 10px;
   background-color: #e6f7ff; /* Màu xanh trời nhạt */
   border-radius: 12px;
 }
 
 .weather-left, .weather-right {
   flex: 1;
   display: flex;
   flex-direction: column;
   align-items: center;
   background-color: #b3e0ff; /* Màu nền xanh trời nhạt cho các khối */
   padding: 15px;
   border-radius: 8px;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }
 
 .weather-left h4 {
   font-size: 1.5rem;
   margin: 0;
   color: #003366;
 }
 
 .weather-left p {
   font-size: 0.9rem;
   color: #666;
   margin-top: 5px;
 }
 
 .weather-right .weather-icon {
   width: 30px;
   height: 30px;
   animation: float 2s ease-in-out infinite;
 }
 
 .weather-right .weather-temp {
   font-size: 2.5rem;
   font-weight: bold;
   color: #0077b6;
   margin-top: 5px;
 }
 
 /* Dòng thông báo thời tiết */
 .weather-reminder-message {
   padding: 15px;
   border-radius: 12px;
   font-weight: bold;
   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
 }
 
 .weather-reminder-message.cold {
   background-color: #b3d9ff;
   color: #004085;
 }
 
 .weather-reminder-message.mild {
   background-color: #cce5ff;
   color: #004085;
 }
 
 .weather-reminder-message.hot {
   background-color: #ffcccc;
   color: #d80000;
 }
 
 .weather-reminder-message.rainy {
   background-color: #a0c4ff;
   color: #003366;
 }
 
 .weather-reminder-message.cloudy {
   background-color: #d6d8db;
   color: #333;
 }
 
 /* Icon floating effect */
 @keyframes float {
   0% { transform: translateY(0px); }
   50% { transform: translateY(-5px); }
   100% { transform: translateY(0px); }
 }
 
 /* Marquee cho thông điệp */
 .marquee {
   width: 100%;
   height: 30px;
   overflow: hidden;
   white-space: nowrap;
   box-sizing: border-box;
 }
 
 .marquee p {
   display: inline-block;
   padding-left: 100%;
   animation: scroll-left 15s linear infinite;
 }
 
 /* Hiệu ứng chạy chữ */
 @keyframes scroll-left {
   0% {
     transform: translateX(0%);
   }
   100% {
     transform: translateX(-100%);
   }
 }
   </style>
   