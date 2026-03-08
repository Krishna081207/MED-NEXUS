@echo off
echo Starting MED-NEXUS HealthMate...
echo.
echo Opening two terminals - run these commands:
echo.
echo Terminal 1 (Backend):
echo   cd "%~dp0backend\fastapi_app"
echo   pip install -r requirements.txt
echo   python main.py
echo.
echo Terminal 2 (Frontend):
echo   cd "%~dp0HealthMate - AI Health Companion"
echo   npm run dev
echo.
start cmd /k "cd /d "%~dp0backend\fastapi_app" && pip install -r requirements.txt && python main.py"
timeout /t 3 /nobreak >nul
start cmd /k "cd /d "%~dp0HealthMate - AI Health Companion" && npm run dev"
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
pause
