import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDOl_u6ygeEJFsI4WwKIZAxeXucVYsnaCo",
//   authDomain: "admin-34b73.firebaseapp.com",
//   projectId: "admin-34b73",
//   storageBucket: "admin-34b73.appspot.com",
//   messagingSenderId: "15167484250",
//   appId: "1:15167484250:web:d584cd3bd4a87277580363",
// };
const firebaseConfig = {
  apiKey: "AIzaSyCjg1Ho0SnLMYAC8D3TN4oGbxCNTzt8wZ0",
  authDomain: "netflix-admin-70527.firebaseapp.com",
  projectId: "netflix-admin-70527",
  storageBucket: "netflix-admin-70527.appspot.com",
  messagingSenderId: "578489467671",
  appId: "1:578489467671:web:5e3e578b6562ef3977ed52",
  measurementId: "G-TDZPN87LD6",
};

// Initialize Firebase
const init = initializeApp(firebaseConfig);
const storage = getStorage(init);
export default storage;
