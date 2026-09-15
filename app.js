
import { app } from "./firebase.js";
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
  signin.onclick = () => {
    signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => location.href = "dashboard.html")
      .catch(e => alert(e.message));
  };
}

const signup = document.getElementById("signup");
if (signup) {
  signup.onclick = () => {
    createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
      .then(() => location.href = "dashboard.html")
      .catch(e => alert(e.message));
  };
}

const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = () => signOut(auth).then(() => location.href = "index.html");
}

onAuthStateChanged(auth, (user) => {
  const username = document.getElementById("username");
  const profileName = document.getElementById("name");
  const profileEmail = document.getElementById("email");

  if (user) {
    if (username) username.textContent = user.email.split("@")[0];
    if (profileName) profileName.textContent = user.email.split("@")[0];
    if (profileEmail) profileEmail.textContent = user.email;
  }
});
