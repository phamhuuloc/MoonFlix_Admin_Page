// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.APP_KEY,
//   authDomain: "netflix-151df.firebaseapp.com",
//   projectId: "netflix-151df",
//   storageBucket: "netflix-151df.appspot.com",
//   messagingSenderId: "316700975498",
//   appId: "1:316700975498:web:15063159b205c1a349a873",
//   measurementId: "G-2ZGE63ES9F",
// };

// const firebaseApp = initializeApp(firebaseConfig);

// const storage = getStorage(firebaseApp);
// export default storage;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOl_u6ygeEJFsI4WwKIZAxeXucVYsnaCo",
  authDomain: "admin-34b73.firebaseapp.com",
  projectId: "admin-34b73",
  storageBucket: "admin-34b73.appspot.com",
  messagingSenderId: "15167484250",
  appId: "1:15167484250:web:d584cd3bd4a87277580363",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
