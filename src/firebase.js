import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  addDoc, 
  collection, 
  getFirestore 
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBV0Z3FOHuKfaNuP_Dxr4C15uSqKiuJp7c",
  authDomain: "netflix-clone-b2e1a.firebaseapp.com",
  projectId: "netflix-clone-b2e1a",
  storageBucket: "netflix-clone-b2e1a.firebasestorage.app",
  messagingSenderId: "940865479160",
  appId: "1:940865479160:web:a6861cec2ba0c46d64f60d",
  measurementId: "G-FWRJJPF8V6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), { // Ensure the collection is named "users"
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error during login:", error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  try {
    signOut(auth);
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export { auth, db, login, signup, logout };
