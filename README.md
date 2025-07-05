# 🏠 Hostel Mess Management System

A comprehensive web application for managing hostel mess operations, attendance tracking, bill calculations, and communication between students, caretakers, and administrators.

## ✨ Features

### 🎯 Core Functionality
- **Multi-role Access**: Separate dashboards for Administrators, Caretakers, and Students
- **Attendance Management**: Track daily student attendance for mess services
- **Bill Calculation**: Automatic bill calculation based on attendance and expenses
- **Payment Tracking**: Monitor payment status and due dates
- **Complaint System**: Submit and manage student complaints
- **Enquiry Management**: Handle student enquiries and support requests
- **News Updates**: Real-time news ticker and announcements
- **Responsive Design**: Mobile-friendly interface

### 👨‍💼 Administrator Features
- Update monthly expenses and calculate bills
- Manage student data and hostel information
- View and respond to complaints
- Publish news announcements
- Monitor overall mess operations

### 👷‍♂️ Caretaker Features
- Update student attendance records
- Manage student data and information
- View complaints and enquiries
- Calculate individual student bills
- Generate attendance reports

### 👨‍🎓 Student Features
- View personal attendance records
- Check payment status and bill amounts
- Submit complaints and enquiries
- Access mess announcements
- Download bill statements

## 🛠 Tech Stack

- **Frontend**: Next.js 15.2.4, React 19
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI, Lucide React Icons
- **Forms**: React Hook Form with Zod validation
- **State Management**: React Hooks, LocalStorage
- **Language**: JavaScript
- **Build Tool**: Next.js built-in bundler

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hostel-mess-system2
   ```

2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables** (if needed)
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**
   ```bash
   npm run dev
  

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.


## 📊 Data Management

The application uses **localStorage** for data persistence, including:
- Student data and attendance records
- Monthly expense calculations
- Complaint and enquiry submissions
- News announcements


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📝 License
This project is licensed under the MIT License
**Made with ❤️ for efficient hostel management**
