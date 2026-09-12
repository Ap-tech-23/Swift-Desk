import { app } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const button = document.querySelector("button");

button.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => alert("Login Successful"))
    .catch((error) => alert(error.message));
});
