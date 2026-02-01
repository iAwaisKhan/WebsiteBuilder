@echo off
echo =====================================
echo   CLOWN AI Website Builder - Startup
echo =====================================
echo.

REM Check if backend directory exists
if not exist "backend" (
    echo ERROR: Backend directory not found!
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
    echo.
)

REM Check if backend dependencies are installed
if not exist "backend\venv" (
    echo Setting up Python virtual environment...
    cd backend
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
    cd ..
    echo.
)

echo Starting Backend Server...
start "CLOWN AI Backend" cmd /k "cd backend && python main.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start "CLOWN AI Frontend" cmd /k "npm run dev"

echo.
echo =====================================
echo   Servers Started Successfully!
echo =====================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to open the application in browser...
pause >nul

start http://localhost:5173

echo.
echo Application opened! Close this window to keep servers running.
echo To stop servers, close the server terminal windows.
pause
