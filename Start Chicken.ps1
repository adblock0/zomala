Set-Location $PSScriptRoot
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host 'Node.js 20 or newer is required.' -ForegroundColor Red
  Write-Host 'Install Node.js from https://nodejs.org/ and run this script again.'
  exit 1
}
if (-not (Test-Path node_modules)) {
  Write-Host "Installing Chicken's local Scramjet dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}
Start-Process 'http://localhost:8080/'
node server.mjs
