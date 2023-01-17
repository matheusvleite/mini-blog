import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA0hm3jGUb_WFg0Q5arXJFiurpwBK5aEdw",
    authDomain: "miniblog-94943.firebaseapp.com",
    projectId: "miniblog-94943",
    storageBucket: "miniblog-94943.appspot.com",
    messagingSenderId: "673251055162",
    appId: "1:673251055162:web:bbe2141b0f9dd3c2c2c703"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };