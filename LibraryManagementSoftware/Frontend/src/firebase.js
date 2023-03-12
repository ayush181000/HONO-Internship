import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA1RsPYcVvHJdZ93sqUg7ivMInk2iOO7-E",
    authDomain: "hono-library.firebaseapp.com",
    projectId: "hono-library",
    storageBucket: "hono-library.appspot.com",
    messagingSenderId: "122469124237",
    appId: "1:122469124237:web:8e9ca3fdd27079218fbac4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);