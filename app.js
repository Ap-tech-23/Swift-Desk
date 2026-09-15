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

// ---------- LOGIN ----------
const fullName = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");

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

// ---------- USER ----------
onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const mail = document.getElementById("email");

  if (username) username.textContent = user.displayName || "Student";
  if (name) name.textContent = user.displayName || "Student";
  if (mail) mail.textContent = user.email;
});

// ---------- PROFILE ----------
const save = document.getElementById("saveProfile");
if (save) {
  const cls = document.getElementById("class");
  const board = document.getElementById("board");

  cls.value = localStorage.getItem("class") || "Diploma";
  board.value = localStorage.getItem("board") || "MSBTE";

  save.onclick = () => {
    localStorage.setItem("class", cls.value);
    localStorage.setItem("board", board.value);
    alert("Profile Saved");
  };
}

// ---------- SOPHIA ----------
const chat = document.getElementById("chat");
const prompt = document.getElementById("prompt");
const ask = document.getElementById("askAI");

function addMsg(text, me) {
  if (!chat) return;

  const div = document.createElement("div");
  div.className = me ? "user-msg" : "ai-msg";
  div.innerHTML = `<b>${me ? "You" : "Sophia"}</b><p>${text}</p>`;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function reply(q) {
  q = q.toLowerCase();

  if (q.includes("photosynthesis"))
    return "Photosynthesis is the process by which green plants prepare food using sunlight, water and carbon dioxide.";

  if (q.includes("newton"))
    return "Newton's First Law: A body remains at rest or in uniform motion unless acted upon by an external force.";

  if (q.includes("history"))
    return "Learn history in chronological order: Event → Cause → Effect → Importance.";

  if (q.includes("summary"))
    return "A good summary includes key ideas, important terms and a 5-point revision note.";

  return "I'm Sophia 🌸. I can explain Science, Maths, History and English. Ask me any study topic!";
}

if (ask) {
  ask.onclick = () => {
    const q = prompt.value.trim();
    if (!q) return;

    addMsg(q, true);
    prompt.value = "";

    setTimeout(() => {
      addMsg(reply(q), false);
    }, 700);
  };
}

// ---------- LOGOUT ----------
const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = async () => {
    await signOut(auth);
    location.href = "index.html";
  };
}
