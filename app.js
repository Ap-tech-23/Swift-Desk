import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");

const signin = document.getElementById("signin");
if (signin) {
  signin.onclick = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => location.href = "dashboard.html")
      .catch(e => alert(e.message));
  };
}

const signup = document.getElementById("signup");
if (signup) {
  signup.onclick = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(() => location.href = "dashboard.html")
      .catch(e => alert(e.message));
  };
}

const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = () => signOut(auth).then(() => location.href = "index.html");
}

onAuthStateChanged(auth, user => {
  const n = document.getElementById("name");
  const e = document.getElementById("email");
  if (user) {
    if (n) n.textContent = user.email.split("@")[0];
    if (e) e.textContent = user.email;
  }
});
