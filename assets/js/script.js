const adminLoginBtn = document.querySelector("#admin-login-btn");
const userLoginBtn = document.querySelector("#user-login-btn");
const userRegisterBtn = document.querySelector("#user-register-btn");

const adminCard = document.querySelector(".admin-login");
const userLoginCard = document.querySelector(".user-login");
const userRegisterCard = document.querySelector(".user-register");

const adminLoginForm = document.querySelector("#admin-form");
const userLoginForm = document.querySelector("#user-form");
const userRegisterForm = document.querySelector("#user-register-form");

const formMap = {
  admin: adminCard,
  user: userLoginCard,
  register: userRegisterCard,
};

const buttonMap = {
  admin: adminLoginBtn,
  user: userLoginBtn,
  register: userRegisterBtn,
};

const emailPattern = /\S+@\S+\.\S+/;

const showSection = (key) => {
  Object.values(formMap).forEach((card) => card.classList.remove("active"));
  Object.values(buttonMap).forEach((btn) => btn.classList.remove("is-active"));

  formMap[key].classList.add("active");
  buttonMap[key].classList.add("is-active");
};

const setAlert = (form, message, type = "error") => {
  let alertEl = form.querySelector(".form-alert");
  if (!alertEl) {
    alertEl = document.createElement("div");
    alertEl.className = "form-alert";
    form.prepend(alertEl);
  }
  alertEl.textContent = message;
  alertEl.classList.toggle("is-error", type === "error");
  alertEl.classList.toggle("is-success", type === "success");
};

const validateForm = (form) => {
  let firstInvalid = null;
  let message = "";

  form.querySelectorAll("input, select").forEach((input) => {
    input.classList.remove("input-error");
    const required = input.hasAttribute("required");
    const value = input.value.trim();

    if (required && !value) {
      input.classList.add("input-error");
      if (!firstInvalid) firstInvalid = input;
      message = "Please fill in all required fields.";
    } else if (input.type === "email" && value && !emailPattern.test(value)) {
      input.classList.add("input-error");
      if (!firstInvalid) firstInvalid = input;
      message = "Please enter a valid email address.";
    }
  });

  if (firstInvalid) {
    firstInvalid.focus();
  }

  return message;
};

[adminLoginBtn, userLoginBtn, userRegisterBtn].forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.currentTarget.id.includes("admin")
      ? "admin"
      : e.currentTarget.id.includes("register")
      ? "register"
      : "user";
    showSection(target);
  });
});

const handleLogin = (form, successRedirect, validEmail, validPassword) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validationMessage = validateForm(form);
    if (validationMessage) {
      setAlert(form, validationMessage, "error");
      return;
    }

    const email = form.querySelector(".email-id").value.trim();
    const password = form.querySelector(".password").value.trim();

    if (email === validEmail && password === validPassword) {
      setAlert(form, "Welcome back! Redirecting...", "success");
      setTimeout(() => {
        window.location.href = successRedirect;
      }, 300);
    } else {
      setAlert(form, "Invalid email or password. Try again.", "error");
    }
  });
};

handleLogin(adminLoginForm, "admin_dashboard.html", "bhattiwaqar5656@gmail.com", "5656");
handleLogin(userLoginForm, "user_dashboard.html", "bhattiwaqar5656@gmail.com", "5757");

userRegisterForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const validationMessage = validateForm(userRegisterForm);

  if (validationMessage) {
    setAlert(userRegisterForm, validationMessage, "error");
    return;
  }

  setAlert(userRegisterForm, "Account created. Redirecting to your dashboard...", "success");
  setTimeout(() => {
    window.location.href = "user_dashboard.html";
  }, 350);
});

// Start on the user login for easier access on load
showSection("user");
