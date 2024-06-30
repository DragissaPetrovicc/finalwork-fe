import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBOfnJ0eoBpu9AhQFKf_TBqFZhNbgcMxAg",
  authDomain: "finalword-loginauth.firebaseapp.com",
  projectId: "finalword-loginauth",
  storageBucket: "finalword-loginauth.appspot.com",
  messagingSenderId: "909435056938",
  appId: "1:909435056938:web:2ff6dcf076faa9320da453"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
