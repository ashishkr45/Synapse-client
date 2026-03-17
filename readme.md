# Synapse Client (SecBrain)

This is the frontend application for **Synapse**, a "second brain" tool that helps users store, organize, and retrieve their digital content (notes, articles, videos, and links) in a structured way.

It is built with **React, TypeScript, and Vite** to provide a fast, responsive, and modern user interface.

---

## 🚀 Features

- **Google OAuth Integration**: Seamless and secure user authentication via Google.
- **Content Dashboard**: A clean interface to view and manage your saved content.
- **Categorized Content Cards**: Distinct UI components for different types of content (Media, Notes, Spaces/Links).
- **Content Creation Modal**: A quick-access modal to add new content on the fly.
- **Embed Support**: Automatically parses and embeds media (like YouTube videos) using custom utilities.
- **Protected Routes**: Secure dashboard access restricted to authenticated users.
- **Responsive Design**: Works beautifully across desktop and mobile screens.

---

## 💻 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS / CSS Modules
- **Routing**: React Router DOM (v6/v7)
- **Authentication**: @react-oauth/google & Custom JWT handling
- **Validation**: Zod (for form validation)
- **HTTP Client**: Axios

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v18 or higher recommended)
- npm or yarn

---

## 🚦 Getting Started

Follow these steps to set up the project locally.

### 1. Clone the repository

`ash
git clone https://github.com/ashishkr45/Synapse-client.git
cd synapse-client
`

### 2. Install dependencies

`ash
npm install
`

### 3. Environment Configuration

Create a \.env\ file in the root directory based on \.env.example\.

`ash
cp .env.example .env
`

You will need to configure the following environment variables:

- \VITE_GOOGLE_CLIENT_ID\: Your Google OAuth Client ID (Get this from Google Cloud Console).
- _Wait for backend configuration instructions if separate._

> **Note:** The backend API URL is currently configured in \src/utility/authApi.ts\. Ideally, this should point to your running backend server (default: \http://localhost:3000\).

### 4. Run the development server

`ash
npm run dev
`

The application will be available at \http://localhost:5173\.

---

## 📜 Scripts

- **\
pm run dev\**: Starts the development server with Hot Module Replacement (HMR).
- **\
pm run build\**: Builds the application for production to the \dist\ folder.
- **\
pm run preview\**: Locally preview the production build.
- **\
pm run lint\**: Runs ESLint to check for code quality issues.

---

## 📂 Project Structure

`ash
src/
├── assets/          # Static assets (images, logos)
├── components/      # Reusable UI components
│   ├── ui/          # Low-level UI components (Buttons, Cards, etc.)
│   └── ...          # Feature-specific components (NavBar, SideBar)
├── icons/           # Custom SVG icons
├── pages/           # Page components (Dashboard, Auth, Landing)
├── utility/         # Helper functions and API services
│   ├── authApi.ts   # Authentication API calls
│   └── embedId.ts   # Utilities for parsing media URLs
├── App.tsx          # Main application component & routing
└── main.tsx         # Application entry point
`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the project.
2. Create your feature branch (\git checkout -b feature/AmazingFeature\).
3. Commit your changes (\git commit -m 'Add some AmazingFeature'\).
4. Push to the branch (\git push origin feature/AmazingFeature\).
5. Open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
