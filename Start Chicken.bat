@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js 20 or newer is required.
  echo Install Node.js from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing Chicken's local Scramjet dependencies...
  call npm install
  if errorlevel 1 (
    echo.
    echo Dependency installation failed.
    pause
    exit /b 1
  )
)
echo.
echo Starting Chicken at http://localhost:8080/
echo Keep this window open while using Chicken.
start "" http://localhost:8080/
node server.mjs
pause
