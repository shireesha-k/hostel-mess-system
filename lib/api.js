const API_URL = 'http://localhost:5001/api';

// Auth API calls
export const authAPI = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  },

  register: async (username, password, role) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });
    return response.json();
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

// Expenses API calls
export const expensesAPI = {
  addExpenses: async (token, data) => {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getExpenses: async (token) => {
    const response = await fetch(`${API_URL}/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

// Attendance API calls
export const attendanceAPI = {
  addAttendance: async (token, data) => {
    const response = await fetch(`${API_URL}/attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  getStudentAttendance: async (token, studentId, month, year) => {
    const response = await fetch(
      `${API_URL}/attendance/student/${studentId}?month=${month}&year=${year}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.json();
  },
};

// Bills API calls
export const billsAPI = {
  getBills: async (token) => {
    const response = await fetch(`${API_URL}/bills`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  getStudentBills: async (token, studentId) => {
    const response = await fetch(`${API_URL}/bills/student/${studentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
}; 