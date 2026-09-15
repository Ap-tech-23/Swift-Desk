import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

// Login page
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");

// Sign In
const signin = document.getElementById("signin");
if (signin) {
  signin.onclick = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      location.href = "dashboard.html";
    } catch (e) {
      alert(e.message);
    }
  };
}

// Create Account
const signup = document.getElementById("signup");
if (signup) {
  signup.onclick = async () => {
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );

      await updateProfile(cred.user, {
        displayName: fullName.value
      });

      location.href = "dashboard.html";
    } catch (e) {
      alert(e.message);
    }
  };
}

// Logout
const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = async () => {
    await signOut(auth);
    location.href = "index.html";
  };
}

// Load user on Dashboard & Profile
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const mail = document.getElementById("email");

  if (username) username.textContent = user.displayName || "Student";
  if (name) name.textContent = user.displayName || "Student";
  if (mail) mail.textContent = user.email;
});
