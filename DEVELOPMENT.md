# Developer Setup Guide

This guide will help you set up the **Web Builder** for local development.

## 📋 Prerequisites

*   **Node.js v18+** (for the frontend)
*   **Python 3.10+** (for the backend AI engine)
*   **Google Gemini API Key** (Get yours [here](https://aistudio.google.com/app/apikey))

## 🚀 Quick Start (Windows)

The project includes an automated setup script for Windows users:

1.  Open your terminal or file explorer.
2.  Run `start.bat`.
3.  The script will:
    *   Initialize `.env` files.
    *   Install Python dependencies in a virtual environment (`backend/venv`).
    *   Install Node.js dependencies (`node_modules`).
    *   Launch the application.

## 🛠️ Manual Step-by-Step Setup

### 1. Backend Configuration
1.  Navigate to the `backend/` folder.
2.  Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
3.  Add your `GEMINI_API_KEY` to the `.env` file.
4.  Install dependencies:
    ```bash
    python -m venv venv
    venv\Scripts\activate  # On Windows
    pip install -r requirements.txt
    ```

### 2. Frontend Configuration
1.  Navigate to the root folder.
2.  Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### 3. Running the Application
| Service | Command | URL |
| :--- | :--- | :--- |
| **Backend** | `npm run backend` | `http://localhost:8000` |
| **Frontend** | `npm run dev` | `http://localhost:5173` |

## 📦 Deployment

*   **Frontend**: Use `npm run build` and deploy the `dist/` folder to hostings like Vercel or Netlify.
*   **Backend**: Deploy using the provided `main.py` entry point. Ensure `PORT` and `GEMINI_API_KEY` are set in the production environment.
