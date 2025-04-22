document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:2005/api/appointments');
    const data = await response.json();
  
    const list = document.getElementById('appointmentList');
    data.forEach(appt => {
      const li = document.createElement('li');
      li.textContent = `${appt.patientName} - ${appt.date} at ${appt.time}`;
      list.appendChild(li);
    });
  });
  