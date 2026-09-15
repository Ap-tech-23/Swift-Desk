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

// ---------- AUTH ----------
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
      const user = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      await updateProfile(user.user, { displayName: fullName.value });
      location.href = "dashboard.html";
    } catch (e) {
      alert(e.message);
    }
  };
}

const logout = document.getElementById("logout");
if (logout) {
  logout.onclick = async () => {
    await signOut(auth);
    location.href = "index.html";
  };
}

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  const username = document.getElementById("username");
  const name = document.getElementById("name");
  const mail = document.getElementById("email");

  if (username) username.textContent = user.displayName;
  if (name) name.textContent = user.displayName;
  if (mail) mail.textContent = user.email;
});

// ---------- PROFILE ----------
const save = document.getElementById("saveProfile");
if (save) {
  save.onclick = () => {
    localStorage.setItem("class", document.getElementById("class").value);
    localStorage.setItem("board", document.getElementById("board").value);
    alert("Profile Saved");
  };
}

// ---------- SOPHIA AI ----------
const chat = document.getElementById("chat");
const prompt = document.getElementById("prompt");
const ask = document.getElementById("askAI");

function addMessage(text, type) {
  const box = document.createElement("div");
  box.className = type;

  box.innerHTML =
    type === "ai-msg"
      ? `<b>Sophia</b><p>${text}</p>`
      : `<b>You</b><p>${text}</p>`;

  chat.appendChild(box);
  chat.scrollTop = chat.scrollHeight;
}

function reply(q) {
  q = q.toLowerCase();

  if (q.includes("photosynthesis"))
    return "Photosynthesis is the process by which green plants prepare food using sunlight, water and carbon dioxide.";

  if (q.includes("newton"))
    return "Newton's First Law: A body remains at rest or in uniform motion unless acted upon by an external force.";

  if (q.includes("mcq"))
    return "I'll generate MCQ quizzes in Swift Desk v2.1. For now, the Quiz page UI is ready.";

  if (q.includes("history"))
    return "Tip: Divide history into events, dates and causes. Learn them in chronological order.";

  return "I'm Sophia 🌸. I can explain concepts, summarize chapters and help you study. Ask me any topic!";
}

if (ask) {
  ask.onclick = () => {
    const q = prompt.value.trim();
    if (!q) return;

    addMessage(q, "user-msg");
    prompt.value = "";

    setTimeout(() => {
      addMessage(reply(q), "ai-msg");
    }, 600);
  };
}

// ---------- QUICK CHIPS ----------
document.querySelectorAll(".chip").forEach((chip) => {
  chip.onclick = () => {
    prompt.value = chip.innerText;
  };
});
