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
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const email = document.getElementById("email");
    if (email) email.textContent = user.email;

    const name = document.getElementById("name");
    if (name) name.textContent = user.email.split("@")[0];
  }
});
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const storage = getStorage(app);

const uploadBtn = document.getElementById("uploadBtn");

if (uploadBtn) {
  uploadBtn.onclick = async () => {
    const file = document.getElementById("pdfFile").files[0];
    if (!file) return alert("Select a PDF first");

    const fileRef = ref(storage, "notes/" + file.name);
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    document.getElementById("notesList").innerHTML +=
      `<p><a href="${url}" target="_blank">${file.name}</a></p>`;

    alert("PDF uploaded successfully!");
  };
}
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-storage.js";

const storage = getStorage(app);

const uploadBtn = document.getElementById("uploadBtn");

if (uploadBtn) {
  uploadBtn.onclick = async () => {
    const file = document.getElementById("pdfFile").files[0];
    if (!file) return alert("Select PDF");

    const fileRef = ref(storage, "notes/" + file.name);
    await uploadBytes(fileRef, file);

    const url = await getDownloadURL(fileRef);

    document.getElementById("notesList").innerHTML +=
      `<p><a href="${url}" target="_blank">${file.name}</a></p>`;
  };
}
