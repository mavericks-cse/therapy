document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You are not logged in!");
      window.location.href = "login.html";
      return;
    }
  
    try {
      const res = await fetch("http://localhost:2005/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        document.getElementById("userName").innerText = data.name || "User";
        document.getElementById("appointmentCount").innerText = data.appointments?.length || 0;
  
        const list = document.getElementById("appointmentsList");
        list.innerHTML = "";
  
        if (data.appointments?.length > 0) {
          data.appointments.forEach((appt) => {
            const li = document.createElement("li");
            li.innerText = `${appt.date} with ${appt.therapist}`;
            list.appendChild(li);
          });
        } else {
          list.innerHTML = "<li>No upcoming appointments</li>";
        }
      } else {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
      alert("Something went wrong.");
    }
  
    // Logout
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  });
  