# React TypeScript Boilerplate

This project is a frontend boilerplate application built with **React, TypeScript, Redux, Redux-Saga, Axios, and React Router**.

## 📂 Project Structure

```
react-typescript-boilerplate/
├─ config/                # Babel and Webpack configuration files
├─ public/                # Static files (favicon, index.html)
├─ src/                   # Source code
│  ├─ components/         # UI components (Form, Modal, Table)
│  ├─ pages/              # Page components (CRUD pages)
│  ├─ store/              # Redux state management
│  ├─ styles/             # SCSS styling files
│  ├─ utils/              # Utility functions
│  ├─ router/             # React Router setup
├─ .env                   # Environment variables
├─ package.json           # Dependencies and scripts
├─ tsconfig.json          # TypeScript configuration
├─ README.md              # Project documentation
```

## 🚀 Setup & Run

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run in development mode:
   ```sh
   npm run start:dev
   ```

3. Build for production:
   ```sh
   npm run build
   ```

## 🔧 Technologies Used

- **React**: Component-based UI development
- **TypeScript**: Typed JavaScript for scalability and safety
- **Redux & Redux-Saga**: Global state management
- **Axios**: HTTP client
- **SCSS**: Advanced styling
- **React Router**: Client-side routing (included in the project stack)