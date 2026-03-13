MAATRAVA:
MAATRAVA is a full-stack health monitoring platform designed to support mothers and infants during the post-natal stage.

The system allows users to track baby growth, vaccinations, illnesses, medication history, and maternal recovery, while providing analytics dashboards and structured health reports.

The platform is built using the MERN architecture with a React + Vite frontend, Node.js backend, and MongoDB database.

Live Features:
Baby health monitoring
Vaccination tracking
Illness & medication records
Maternal recovery monitoring
Analytics dashboards
Secure authentication
Health reports generation

Problem Statement
Many mothers maintain paper-based records for infant growth and vaccinations, which leads to:

• Lost health history
• Missed vaccination schedules
• No centralized monitoring
• Difficulty sharing data with doctors

MAATRAVA solves this by providing a structured digital health tracking platform.

Baby Tracker Module
Developer: Rama Roshinee S V
This module monitors infant health records and growth patterns.
Features
• Baby Registration
• Growth Monitoring
• Vaccination Records
• Illness Tracking
• Medication History
• Growth Analytics

Comprehensive Baby Health Report

Visualization
Growth Trend Chart

User Management & Personalization
Developer: Devika Unnikrishnan

Handles user authentication and profile personalization.

Features
• User Signup & Login
• JWT Authentication
• Profile Management
• Password Recovery
• User Preferences
• Chatbot interactions


Maternal Health Monitoring
Developer: Kanishka D

Tracks maternal health after childbirth.

Features
• Mental health tracking
• Sleep monitoring
• Symptom logging
• Recovery analytics

Authentication
Authentication is implemented using:
JWT (JSON Web Tokens)
Secure login sessions
Protected API routes

Testing
The system includes:
CRUD operation testing
API validation testing
Form validation
Authentication testing

Installation Guide
1 Clone Repository
git clone https://github.com/yourusername/maatrava.git
cd maatrava
2 Install Dependencies
npm install
3 Run Development Server
npm run dev
Application will run at:

http://localhost:5173
🗄 Database Configuration
Example MongoDB connection:

mongodb+srv://username:password@cluster.mongodb.net/maatrava
📁 Project Structure
maatrava
│
├── frontend
│   ├── components
│   ├── pages
│   ├── services
│   └── App.jsx
│
├── backend
│   ├── routes
│   ├── models
│   ├── controllers
│   └── server.js
│
└── README.md
🔮 Future Enhancements
• Doctor portal integration
• AI health risk prediction
• Vaccination reminders
• Mobile application
• Telemedicine integration

 
 Contributors

Rama Roshinee S V
Baby Tracker Module

Devika Unnikrishnan
User Management & Personalization

Kanishka D
Maternal Health Monitoring

📜 License
This project is developed for academic and research purposes.
