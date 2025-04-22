document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const therapistId = document.getElementById('therapistId').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;
  
    const res = await fetch('http://localhost:2005/api/appointments/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ therapistId, date, time, notes })
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert('Appointment booked successfully!');
      document.getElementById('bookForm').reset();
    } else {
      alert(data.message || 'Error booking appointment.');
    }
  });
  