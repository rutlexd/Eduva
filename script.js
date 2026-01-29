document.addEventListener("DOMContentLoaded", () => {

  let mode = "login";

  const modal = document.getElementById("authModal");
  const title = document.getElementById("authTitle");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const authArea = document.querySelector(".auth");

  window.openAuth = function () {
    modal.style.display = "flex";
  };

  window.closeAuth = function (e) {
    if (e && e.target !== modal) return;
    modal.style.display = "none";
  };

  window.switchMode = function () {
    mode = mode === "login" ? "register" : "login";
    title.innerText = mode === "login" ? "Login" : "Register";
  };

  window.handleAuth = function () {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (mode === "register") {
      if (users.find(u => u.email === email)) {
        alert("User already exists");
        return;
      }

      users.push({ email, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registration successful");
      switchMode();
      return;
    }

    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      alert("Wrong email or password");
      return;
    }

    localStorage.setItem("currentUser", email);
    modal.style.display = "none";
    updateAuthUI();
  };

  window.logout = function () {
    localStorage.removeItem("currentUser");
    updateAuthUI();
  };

  function updateAuthUI() {
    const user = localStorage.getItem("currentUser");

    if (user) {
      authArea.innerHTML = `
        <span>${user}</span>
        <button class="btn outline" onclick="logout()">Logout</button>
      `;
    } else {
      authArea.innerHTML = `
        <a href="#" class="login" onclick="openAuth()">Log in</a>
        <a href="#" class="btn primary" onclick="openAuth()">Sign up</a>
      `;
    }
  }

  updateAuthUI();
});
window.handleGetStarted = function () {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    openAuth(); // відкриває логін / реєстрацію
  } else {
    document.getElementById("courses").scrollIntoView({
      behavior: "smooth"
    });
  }
};

window.scrollToFeatures = function () {
  document.getElementById("features").scrollIntoView({
    behavior: "smooth"
  });
};
let selectedCourse = "";

window.openCourse = function (courseName) {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    openAuth(); // якщо не залогінений
    return;
  }

  selectedCourse = courseName;

  document.getElementById("courseTitle").innerText = courseName;
  document.getElementById("courseDesc").innerText =
    "Open " + courseName + " course";

  document.getElementById("courseModal").style.display = "flex";
};

window.closeCourse = function () {
  document.getElementById("courseModal").style.display = "none";
};

window.enrollCourse = function () {
  let enrolled = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

  if (!enrolled.includes(selectedCourse)) {
    enrolled.push(selectedCourse);
    localStorage.setItem("enrolledCourses", JSON.stringify(enrolled));
  }

  alert("You are enrolled in " + selectedCourse + " 🎉");
  closeCourse();
};
window.openEnrolledCourse = function () {
  alert("Course opened 📘 (demo mode)");
};
