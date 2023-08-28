const alerts = document.querySelector(".alertContainer");
const email = document.querySelector(".email");
const username = document.querySelector(".username");
const password = document.querySelector(".password");
const password2 = document.querySelector(".confirm-password");
const registerBtn = document.querySelector(".register-btn");

const checkRegisterInputs = async () => {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();
  if (
    usernameValue.length == 0 ||
    emailValue.length == 0 ||
    passwordValue.length == 0
  ) {
    alerts.innerHTML = "Please fill in all fields";
  } else {
    if (passwordValue !== password2Value) {
      let html = `passwords do not match`;

      alerts.innerHTML = `
      <div class = "alert">
      ${html}
      </div>
      `;

      setTimeout(() => {
        alerts.innerHTML = "";
      }, 2000);
    } else {
      let user = {
        username: username.value,
        email: email.value,
        password: password.value,
      };
      return user;
    }
  }
};

registerBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = await checkRegisterInputs();
  try {
    const res = await fetch(
      "https://shopieapi.azurewebsites.net/api/v1/users/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    const data = await res.json();
    if (data.status === "success") {
      alerts.innerHTML = `
      <div class = "alert">
      ${data.message}
      </div>
      `;

      setTimeout(() => {
        window.location.href =
          "http://127.0.0.1:5500/frontend/authentication-page/login/index.html";
      }, 2000);
    }
    if (data.status === "failed") {
      alerts.innerHTML = `
      <div class = "alert">
      ${data.message}
      </div>
      `;
      setTimeout(() => {
        alerts.innerHTML = "";
      }, 2000);
    }
  } catch (error) {
    alerts.innerHTML = `
    <div class = "alert">
    ${error.message}
    </div>
    `;
    console.log(error);
    // alerts.innerHTML = error.message;
  }
});
