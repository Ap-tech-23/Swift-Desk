import { app, db } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

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

const signup = document.getElementById("signup");
if (signup) {
  signup.onclick = async () => {
    try {
      await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
      location.href = "dashboard.html";
    } catch (e) {
      alert(e.message);
    }
  };
}

const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = () => signOut(auth).then(() => location.href = "index.html");
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const username = document.getElementById("username");
    const profileName = document.getElementById("name");
    const profileEmail = document.getElementById("email");

    const displayName = user.email.split("@")[0];

    if (username) username.textContent = displayName;
    if (profileName) profileName.textContent = displayName;
    if (profileEmail) profileEmail.textContent = user.email;
  }
});
