import { app, db } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const fullNameInput = document.getElementById("fullname");
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
      const cred = await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
await updateProfile(cred.user, {
  displayName: fullNameInput.value
});
      await setDoc(doc(db, "users", cred.user.uid), {
        name: fullNameInput.value,
        email: emailInput.value
      });

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

    if (username) username.textContent = user.displayName;
    if (profileName) profileName.textContent = user.displayName;
    if (profileEmail) profileEmail.textContent = user.email;
  }
});
