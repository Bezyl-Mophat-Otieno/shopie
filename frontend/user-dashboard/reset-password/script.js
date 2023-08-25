const alert = document.querySelector(".alert");
const confirmBtn = document.querySelector(".confirmBtn");
const email = document.querySelector(".email");

confirmBtn.addEventListener("click", async () => {
  if (email === "") {
    alert.innerHTML = "Please enter your email";
    setTimeout(() => {
      alert.innerHTML = "";
    }, 3000);
  } else {
    try {
      const res = await fetch("http://localhost:5000/api/v1/users/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.value }),
      });
      const data = await res.json();
      if (data.status == "success") {
        alert.innerHTML = data.message;
        setTimeout(() => {
          alert.innerHTML = "";
          email.value = "";
        }, 3000);
      }
    } catch (error) {
      alert.innerHTML = error.message;
      setTimeout(() => {
        alert.innerHTML = "";
      }, 3000);
    }
  }
});
