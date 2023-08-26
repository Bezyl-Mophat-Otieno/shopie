const alerts = document.querySelector(".alert");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const loginBtn = document.querySelector("#loginBtn");

const checkLoginInputs = async () => {
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  if (emailValue.length == 0 || passwordValue.length == 0) {
    alerts.innerHTML = "Please fill in all fields";
  } else {
    let user = {
      email: email.value,
      password: password.value,
    };
    return user;
  }
};

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const user = await checkLoginInputs();
  try {
    const res = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (data.status === "success") {
      alerts.innerHTML = data.message;

      const token = data.token;
      if (token) {
        // store the token to localstorage
        localStorage.setItem("token", token);
        // get loggedInUser using the token
        const res = await fetch("http://localhost:5000/api/v1/users/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            token: token,
          },
        });
        const data = await res.json();
        // store the user in local storage
        localStorage.setItem("loggedUser", data.user.username);
        localStorage.setItem("user_id", data.user.id);
        if (data?.user?.role === "admin") {
          window.location.href =
            "http://127.0.0.1:5500/frontend/admin-dashboard/index.html";
        } else {
          window.location.href =
            "http://127.0.0.1:5500/frontend/user-dashboard/index.html";
        }
      }
    } else {
      if (data.status === "failed") {
        alerts.innerHTML = data.message;
        setTimeout(() => {
          alerts.innerHTML = "";
        }, 2000);
      } else {
        alerts.innerHTML = data.message;
        setTimeout(() => {
          alerts.innerHTML = "";
        }, 2000);
      }
    }
  } catch (err) {
    alert(err.message);
    console.log(err);
  }
});
