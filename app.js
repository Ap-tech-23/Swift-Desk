import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

const auth = getAuth(app);

const email = document.querySelector('input[type="email"]');
const password = document.querySelector('input[type="password"]');
const signin = document.querySelector("button");
const signup = document.getElementById("signup");

signin.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => alert("Login Successful"))
    .catch((e) => alert(e.message));
});

signup.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => alert("Account Created"))
    .catch((e) => alert(e.message));
});
