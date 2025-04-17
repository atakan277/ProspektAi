import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Kimlik doğrulama servisi
const auth = getAuth(app);

// Google sağlayıcısı
const googleProvider = new GoogleAuthProvider();

// Google ile giriş yapma fonksiyonu
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google ile giriş hatası:", error);
    throw error;
  }
};

// Çıkış yapma fonksiyonu
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Çıkış hatası:", error);
    throw error;
  }
};

// Auth servisi ve kullanıcı izleme için ihraç et
export { auth };