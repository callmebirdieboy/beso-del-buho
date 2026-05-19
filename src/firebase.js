import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0a_iRu8U38avw4TN6ygYCUW4DFtW9wv0",
  authDomain: "beso-del-buho.firebaseapp.com",
  projectId: "beso-del-buho",
  storageBucket: "beso-del-buho.firebasestorage.app",
  messagingSenderId: "998136423283",
  appId: "1:998136423283:web:f04d1ec0719c420fe61b06"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);