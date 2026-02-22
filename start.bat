@echo off
setlocal
echo =====================================
echo   Web Builder AI - Setup
echo =====================================
echo.

REM --- Step 1: Initialize Environment ---
echo Initializing environment files...
if not exist ".env" (
    copy ".env.example" ".env"
    echo Created .env from .env.example
)
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo Created backend\.env from backend\.env.example
)
echo.

REM --- Step 2: Backend Dependencies ---
if not exist "backend\venv" (
    echo Setting up Python virtual environment...
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    cd ..
    echo Python environment ready!
) else (
    echo Python environment already exists.
)
echo.

REM --- Step 3: Frontend Dependencies ---
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo Frontend dependencies ready!
) else (
    echo Frontend dependencies already exist.
)
echo.

REM --- Step 4: Launch ---
echo.
echo =====================================
echo   Environment Setup Complete!
echo =====================================
echo.
echo NOTE: Ensure you have added your GEMINI_API_KEY in backend\.env
echo.
set /p choice="Start servers now? (y/n): "
if /i "%choice%" neq "y" goto :exit

echo Starting processes...
start "Web Builder Backend" cmd /k "cd backend && venv\\Scripts\\activate && python main.py"
timeout /t 3 /nobreak >nul
start "Web Builder Frontend" cmd /k "npm run dev"

start http://localhost:5173
echo Application launched!

:exit
echo Setup finished.
pause

