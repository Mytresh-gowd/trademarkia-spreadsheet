import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBw5fT6BAL3sXrn4VJDuRijqXLTR0KetEA",
  authDomain: "spreadsheet-demo-af666.firebaseapp.com",
  projectId: "spreadsheet-demo-af666",
  storageBucket: "spreadsheet-demo-af666.firebasestorage.app",
  messagingSenderId: "925741334456",
  appId: "1:925741334456:web:f0180c7cc9db8d1fe1994d"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)