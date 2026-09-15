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

const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Sign In
const signin = document.getElementById("signin");
if (signin) {
  signin.onclick = async () => {
    try {
      await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
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
        emailInput.value,
        passwordInput.value
      );

      await updateProfile(cred.user, {
        displayName: fullNameInput.value
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

// Load profile
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const username = document.getElementById("username");
  const profileName = document.getElementById("name");
  const profileEmail = document.getElementById("email");

  if (username) username.textContent = user.displayName || "Student";
  if (profileName) profileName.textContent = user.displayName || "Student";
  if (profileEmail) profileEmail.textContent = user.email;

  const cls = document.getElementById("class");
  const board = document.getElementById("board");

  if (cls) cls.value = localStorage.getItem("class") || "Diploma";
  if (board) board.value = localStorage.getItem("board") || "MSBTE";
});

// Save Profile
const save = document.getElementById("saveProfile");
if (save) {
  save.onclick = () => {
    localStorage.setItem("class", document.getElementById("class").value);
    localStorage.setItem("board", document.getElementById("board").value);
    alert("Profile Saved!");
  };
}
