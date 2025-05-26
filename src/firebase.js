// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDEuZwUnbReQxJvouytxlLDgWtji9TCZD0",
    authDomain: "tkwnn-khoa-ngoai-ngu.firebaseapp.com",
    projectId: "tkwnn-khoa-ngoai-ngu",
    storageBucket: "tkwnn-khoa-ngoai-ngu.firebasestorage.app",
    messagingSenderId: "546743077883",
    appId: "1:546743077883:web:90d101dbf5d037d3ef195e",
    measurementId: "G-YKMFWVYTEL"
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
