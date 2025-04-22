const form = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const res = await fetch('http://localhost:2005/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = 'dashboard.html'; // redirect on success
    } else {
      errorMsg.textContent = data.message || 'Login failed.';
    }
  } catch (err) {
    errorMsg.textContent = 'Server error. Please try again.';
    console.error(err);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token'); // Assuming you stored JWT after login

  // Submit appointment form
  const form = document.getElementById('appointmentForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const date = document.getElementById('appointmentDate').value;
    const therapist = document.getElementById('appointmentTherapist').value;

    try {
      const res = await fetch('http://localhost:2005/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ date, therapist }),
      });

      const data = await res.json();
      document.getElementById('formMessage').textContent = data.message;

      if (res.ok) {
        form.reset();
      } else {
        document.getElementById('formMessage').style.color = 'red';
      }
    } catch (err) {
      console.error('Error:', err);
      document.getElementById('formMessage').textContent = 'Something went wrong.';
      document.getElementById('formMessage').style.color = 'red';
    }
  });
});

