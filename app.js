import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("signin").onclick = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => window.location = "dashboard.html")
    .catch(e => alert(e.message));
};

document.getElementById("signup").onclick = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => window.location = "dashboard.html")
    .catch(e => alert(e.message));
};
import { signOut } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const logout = document.getElementById("logout");

if (logout) {
  logout.onclick = () => {
    signOut(auth).then(() => {
      window.location = "index.html";
    });
  };
}
