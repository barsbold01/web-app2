/* ── USER STORE ── */
function getUsers() {
  return JSON.parse(localStorage.getItem("ns_users") || "[]");
}
function saveUsers(users) {
  localStorage.setItem("ns_users", JSON.stringify(users));
}
function findUser(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}
function createSession(user) {
  localStorage.setItem(
    "ns_session",
    JSON.stringify({ email: user.email, name: user.firstname, grade: user.grade })
  );
}

/* ── TAB SWITCH ── */
function switchTab(tab) {
  document.querySelectorAll(".tab-btn").forEach((btn, i) => {
    const isActive = (i === 0 && tab === "login") || (i === 1 && tab === "register");
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive);
  });
  document.querySelectorAll(".auth-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === "panel-" + tab);
  });
}

/* ── HELPERS ── */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.previousElementSibling && el.previousElementSibling.classList.add("invalid");
  }
}
function clearErrors(...ids) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = "";
    }
  });
  document.querySelectorAll(".form-input.invalid").forEach((i) => i.classList.remove("invalid"));
}
function setLoading(btn, loading) {
  btn.disabled = loading;
  btn.textContent = loading ? "УНШИЖ БАЙНА..." : btn.dataset.label;
}

/* ── PASSWORD TOGGLE ── */
document.querySelectorAll(".pwd-toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const eyeOn = btn.querySelector(".eye-icon");
    const eyeOff = btn.querySelector(".eye-off-icon");
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    eyeOn.style.display = isHidden ? "none" : "";
    eyeOff.style.display = isHidden ? "" : "none";
  });
});

/* ── LOGIN ── */
const loginForm = document.getElementById("login-form");
const loginBtn = document.getElementById("login-btn");
loginBtn.dataset.label = loginBtn.textContent;

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors("login-email-err", "login-password-err");

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  let valid = true;

  if (!email) {
    showError("login-email-err", "И-мэйл хаягаа оруулна уу.");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError("login-email-err", "Зөв и-мэйл хаяг оруулна уу.");
    valid = false;
  }
  if (!password) {
    showError("login-password-err", "Нууц үгээ оруулна уу.");
    valid = false;
  } else if (password.length < 6) {
    showError("login-password-err", "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.");
    valid = false;
  }
  if (!valid) return;

  /* Check credentials against stored users; allow any valid format for demo */
  const user = findUser(email);
  if (user && user.password !== password) {
    showError("login-password-err", "Нууц үг буруу байна.");
    return;
  }

  setLoading(loginBtn, true);
  const sessionUser = user || { email, firstname: email.split("@")[0], grade: "" };
  setTimeout(() => {
    createSession(sessionUser);
    window.location.href = "dashboard.html";
  }, 700);
});

/* ── REGISTER ── */
const registerForm = document.getElementById("panel-register").querySelector("form");
const registerBtn = document.getElementById("register-btn");
registerBtn.dataset.label = registerBtn.textContent;

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstname = document.getElementById("reg-firstname").value.trim();
  const lastname = document.getElementById("reg-lastname").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const grade = document.getElementById("reg-grade").value;

  if (!firstname || !lastname || !email || !password || !grade) {
    alert("Бүх талбарыг бөглөнө үү.");
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Зөв и-мэйл хаяг оруулна уу.");
    return;
  }
  if (password.length < 8) {
    alert("Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой.");
    return;
  }
  if (findUser(email)) {
    alert("Энэ и-мэйл хаягаар бүртгэл аль хэдийн байна.");
    return;
  }

  const users = getUsers();
  users.push({ firstname, lastname, email, password, grade });
  saveUsers(users);

  setLoading(registerBtn, true);
  setTimeout(() => {
    createSession({ email, firstname, grade });
    window.location.href = "dashboard.html";
  }, 700);
});

/* ── SOCIAL BUTTONS ── */
document.querySelectorAll(".btn-social").forEach((btn) => {
  btn.addEventListener("click", () => {
    createSession({ email: "social@nextsteps.mn", firstname: "Хэрэглэгч", grade: "" });
    window.location.href = "dashboard.html";
  });
});
