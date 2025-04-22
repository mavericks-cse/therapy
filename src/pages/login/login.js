document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const role = document.getElementById('loginRole').value;

  const response = await fetch("http://localhost:2005/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role })
  });

  const data = await response.json();
  console.log(data);

  if (response.ok) {
    alert("Login successful!");
    window.location.href = "dashboard.html"; // or route based on role
  } else {
    alert("Login failed: " + data.message);
  }
});
